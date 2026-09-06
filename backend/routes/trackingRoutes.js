const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
const sseEmitter = require('../utils/sseEmitter');

// Import MongoDB Models
const Tracking = require('../models/Tracking');
const Avatar = require('../models/Avatar');
const ClosedClass = require('../models/ClosedClass');
const Major = require('../models/Major');
const Faculty = require('../models/Faculty');

// ==========================================
// SSE STREAM: TRACKING DATA REALTIME UPDATES
// ==========================================
router.get("/tracking-stream", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
  
    const listener = () => {
        res.write(`data: ${JSON.stringify({ type: 'update' })}\n\n`);
    };
  
    sseEmitter.on('tracking_updated', listener);
  
    req.on('close', () => {
        sseEmitter.off('tracking_updated', listener);
    });
});

const extractPureCohort = (str) => {
    if (!str) return '';
    let s = String(str).trim();
    if (/^G\d+-/i.test(s)) {
        const parts = s.split('-');
        if (parts.length >= 3) {
            let pure = `${parts[0]}-${parts[1]}`;
            if (/^[a-zA-Z0-9]{1,3}$/.test(parts[2])) {
                pure += `-${parts[2]}`;
            }
            return pure.toUpperCase();
        }
        return s.toUpperCase(); 
    }
    return s; 
};

const calculateHours = (start, end) => {
    if(!start || !end) return "0 ម៉ោង 00 នាទី";
    const s = new Date(`1970-01-01T${start}:00`);
    const e = new Date(`1970-01-01T${end}:00`);
    let diff = e - s;
    if (diff < 0) diff += 24 * 60 * 60 * 1000;
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.round((diff % 3600000) / 60000);
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    return `${hrs} ម៉ោង ${formattedMins} នាទី`;
};

const noCache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

const normalizeText = (str) => {
    return String(str || "").replace(/[\s\u200B-\u200D\uFEFF]/g, '').toLowerCase();
};

// ==========================================
// 🔥 HELPER: STRICT VISUAL ATTENDANCE VALIDATOR + PAINTER
// ==========================================
const markVisualAttendance = async (sheets, cohort, subject, teacher, date, status, substituteFor = null) => {
    try {
        const dateObj = new Date(date);
        const monthNum = String(dateObj.getMonth() + 1).padStart(2, '0');
        const targetDay = parseInt(dateObj.getDate());
        
        const KHMER_MONTHS = {
            "01": "មករា", "02": "កុម្ភៈ", "03": "មីនា", "04": "មេសា", "05": "ឧសភា", "06": "មិថុនា",
            "07": "កក្កដា", "08": "សីហា", "09": "កញ្ញា", "10": "តុលា", "11": "វិច្ឆិកា", "12": "ធ្នូ"
        };
        const khmerMonth = normalizeText(KHMER_MONTHS[monthNum]);

        const genMatch = String(cohort).match(/G(\d+)/i);
        let targetGenKhmerStr = null;
        if (genMatch) {
            const khmerNums = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"];
            const genKhmer = genMatch[1].split('').map(n => khmerNums[parseInt(n)]).join('');
            targetGenKhmerStr = `ជំនាន់ទី${genKhmer}`; 
        }

        const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.ATTENDANCE });
        const tabs = sheetMeta.data.sheets; 

        let targetSheetId = null;
        let missingDates = [];
        let targetTabTitle = null;
        let targetRowIndex = -1;
        let targetColIndex = -1;

        const targetTeacherName = substituteFor || teacher;
        const cleanTeacher = normalizeText(String(targetTeacherName).replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
        const cleanSubject = normalizeText(subject);
        const cleanCohort = normalizeText(String(cohort).replace(/^g\d+-/i, ''));

        const filteredTabs = tabs.filter(tab => {
            const normalizedTitle = normalizeText(tab.properties.title);
            if (targetGenKhmerStr && !normalizedTitle.includes(normalizeText(targetGenKhmerStr))) return false;
            return true;
        });

        if (filteredTabs.length === 0) {
            let errorMsg = `The date ${date} does not match the scheduled days for this class!`;
            return { success: false, message: errorMsg };
        }

        for (let i = 0; i < filteredTabs.length; i++) {
            const tab = filteredTabs[i];
            const tabTitle = tab.properties.title;
            
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEETS.ATTENDANCE,
                range: `'${tabTitle}'!A1:AZ200`
            });
            const rows = response.data.values || [];
            if (rows.length < 7) continue;

            let monthRowIndex = -1;
            for (let r = 0; r < 8; r++) {
                if (rows[r] && rows[r].some(cell => /មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ/.test(normalizeText(cell)))) {
                    monthRowIndex = r;
                    break;
                }
            }

            const monthMap = {};
            if (monthRowIndex !== -1) {
                let currentMonth = "";
                for (let c = 6; c < 100; c++) { 
                    if (rows[monthRowIndex][c] && String(rows[monthRowIndex][c]).trim() !== "") {
                        currentMonth = normalizeText(rows[monthRowIndex][c]);
                    }
                    monthMap[c] = currentMonth;
                }
            }

            let bestRowMatch = -1;
            let fallbackRowMatch = -1;

            for (let r = 7; r < rows.length; r++) { 
                if (!rows[r]) continue;
                const rowSubject = normalizeText(rows[r][2]); 
                const rowTeacher = normalizeText(rows[r][3]); 
                const rowCohortClean = normalizeText(rows[r][6]).replace(/^g\d+-/i, '');

                if (rowSubject === cleanSubject && rowTeacher.includes(cleanTeacher)) {
                    if (fallbackRowMatch === -1) fallbackRowMatch = r;
                    if (rowCohortClean.includes(cleanCohort) || cleanCohort.includes(rowCohortClean)) {
                        bestRowMatch = r;
                        break;
                    }
                }
            }

            targetRowIndex = bestRowMatch !== -1 ? bestRowMatch : fallbackRowMatch;

            if (targetRowIndex !== -1) {
                targetSheetId = tab.properties.sheetId;
                targetTabTitle = tabTitle;
                let blockHeaderRowIdx = -1;
                
                for (let i = targetRowIndex; i >= 6; i--) {
                    if (!rows[i]) continue;
                    const checkStr = normalizeText(rows[i][0]) + normalizeText(rows[i][1]) + normalizeText(rows[i][2]);
                    if (checkStr.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(checkStr)) {
                        blockHeaderRowIdx = i;
                        break;
                    }
                }

                if (blockHeaderRowIdx !== -1) {
                    missingDates = []; // reset for this tab
                    const dayRow = rows[blockHeaderRowIdx];
                    const teacherRow = rows[targetRowIndex];
                    
                    for (let c = 7; c < Math.max(dayRow.length, 100); c++) {
                        const dayCell = String(dayRow[c] || "").trim();
                        if (dayCell !== "" && !isNaN(dayCell)) {
                            if (monthMap[c] === khmerMonth && parseInt(dayCell) === targetDay) {
                                targetColIndex = c;
                                break;
                            }
                            
                            // Check if this date has not been tracked yet (empty or "A")
                            const statusCell = teacherRow[c] ? String(teacherRow[c]).trim() : "";
                            if (statusCell === "" || statusCell === "A") {
                                const m = monthMap[c] || "";
                                missingDates.push(`${m} ${dayCell}`.trim());
                            }
                        }
                    }
                }
                if (targetColIndex !== -1) break; 
            }
        }

        if (targetRowIndex === -1 || targetColIndex === -1) {
            let errorMsg = `The date ${date} does not match the scheduled days for this class!`;
            if (missingDates.length > 0) {
                errorMsg += `\n(ថ្ងៃដែលមិនទាន់បំពេញ: ${missingDates.join(", ")})`;
            }
            return { success: false, message: errorMsg };
        }

        let bgRed = 1, bgGreen = 1, bgBlue = 1; 
        let txtRed = 0, txtGreen = 0, txtBlue = 0; 

        if (status === "✓") {
            bgRed = 0.2; bgGreen = 0.66; bgBlue = 0.33; 
            txtRed = 1; txtGreen = 1; txtBlue = 1; 
        } else if (status === "A") {
            bgRed = 0.8; bgGreen = 0.0; bgBlue = 0.0; 
            txtRed = 1; txtGreen = 1; txtBlue = 1; 
        } else if (status === "P") {
            // Yellow background for Permission/Substitute
            bgRed = 1.0; bgGreen = 0.89; bgBlue = 0.6; 
            txtRed = 0; txtGreen = 0; txtBlue = 0; // Black text
        } else if (status === "") {
            bgRed = 1; bgGreen = 1; bgBlue = 1; 
        }

        const cellData = {
            userEnteredValue: { stringValue: status },
            userEnteredFormat: {
                backgroundColor: { red: bgRed, green: bgGreen, blue: bgBlue },
                textFormat: { foregroundColor: { red: txtRed, green: txtGreen, blue: txtBlue }, bold: true },
                horizontalAlignment: "CENTER",
                verticalAlignment: "MIDDLE"
            }
        };

        if (substituteFor && status !== "" && status !== "A") {
            cellData.note = `បង្រៀនជំនួសដោយ: ${teacher}`;
        } else if (status === "" || status === "A") {
            cellData.note = "";
        }

        const fieldsToUpdate = (substituteFor || status === "" || status === "A")
            ? "userEnteredValue,userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment),note"
            : "userEnteredValue,userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)";

        const requests = [{
            updateCells: {
                range: {
                    sheetId: targetSheetId,
                    startRowIndex: targetRowIndex,
                    endRowIndex: targetRowIndex + 1,
                    startColumnIndex: targetColIndex,
                    endColumnIndex: targetColIndex + 1
                },
                rows: [{
                    values: [cellData]
                }],
                fields: fieldsToUpdate
            }
        }];

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEETS.ATTENDANCE,
            requestBody: { requests }
        });

        return { success: true };

    } catch (error) {
        console.error("Error marking visual attendance:", error);
        return { success: false, message: "System error while verifying the class date." };
    }
};

// ==========================================
// POST: TRACK LESSON
// ==========================================
router.post("/track-lesson", async (req, res) => {
  try {
    const { teacherNameKh, department, subject, cohort, room, week, date, startTime, endTime, lessonNo, hours, content, notes, year, semester, substituteFor, isExtraClass } = req.body;
    
    // Attempt visual attendance marking in Google Sheets
    if (!isExtraClass) {
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });
        const attendanceStatus = substituteFor ? "P" : "✓";
        const visualRes = await markVisualAttendance(sheets, cohort, subject, teacherNameKh, date, attendanceStatus, substituteFor);
        if (!visualRes.success) {
            return res.status(400).json({ success: false, message: visualRes.message });
        }
    }

    const pureCohort = extractPureCohort(cohort);
    let fullMajorName = pureCohort; 
    let fullFacultyName = department || "Unknown Department"; 

    const genMatch = pureCohort.match(/G(\d+)/i);
    const generation = genMatch ? `ជំនាន់ទី ${genMatch[1]}` : "Unknown";

    let formattedYear = String(year || "?").trim();
    if (formattedYear === "1" || formattedYear === "១") formattedYear = "ឆ្នាំសិក្សាមូលដ្ឋាន";
    else if (formattedYear === "2" || formattedYear === "២") formattedYear = "2";
    else if (formattedYear === "3" || formattedYear === "៣") formattedYear = "3";
    else if (formattedYear === "4" || formattedYear === "៤") formattedYear = "4";

    try {
        const majors = await Major.find();
        const matchMajor = majors.find(m => m.code && pureCohort.includes(m.code));
        if (matchMajor) fullMajorName = matchMajor.fullName;

        const faculties = await Faculty.find();
        const matchFaculty = faculties.find(f => f.code && pureCohort.includes(f.code));
        if (matchFaculty) fullFacultyName = matchFaculty.fullName;
    } catch (e) {
        console.error("Error fetching major/faculty:", e);
    }

    const safeDate = date ? `${date}` : "";
    const safeStartTime = startTime ? `${startTime}` : "";
    const safeEndTime = endTime ? `${endTime}` : "";

    let finalNotes = String(notes || "").trim();
    if (substituteFor) {
        const subNote = `[បង្រៀនជំនួស: ${substituteFor}]`;
        if (!finalNotes.includes(subNote)) {
            finalNotes = finalNotes ? `${subNote} ${finalNotes}` : subNote;
        }
    }
    if (isExtraClass && !finalNotes.includes('[ថែមម៉ោង]')) {
        finalNotes = finalNotes ? `[ថែមម៉ោង] ${finalNotes}` : `[ថែមម៉ោង]`;
    }

    const newTracking = new Tracking({
        department: fullFacultyName,
        major: fullMajorName,
        generation,
        year: formattedYear,
        semester: semester || "?",
        subject,
        cohort: pureCohort,
        teacher: teacherNameKh,
        week,
        date: safeDate,
        startTime: safeStartTime,
        endTime: safeEndTime,
        lessonNo,
        content,
        hours,
        notes: finalNotes,
        room
    });

    await newTracking.save();

    sseEmitter.emit('tracking_updated');

    res.json({ success: true, message: "Data saved successfully to Database" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving tracking data" });
  }
});

// ==========================================
// GET: CLASS HISTORY
// ==========================================
router.get("/class-history", noCache, async (req, res) => {
  try {
    const { cohort, subject, teacher } = req.query;
    if (!cohort) return res.status(400).json({ success: false, message: "Cohort required" });

    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = normalizeText(subject); 
    
    let targetTeacher = teacher ? normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '')) : "";
    if (!targetTeacher && cohort.includes('-')) {
        const parts = String(cohort).split('-');
        if (parts.length >= 4) targetTeacher = normalizeText(parts[3].replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
    }

    const query = {};
    if (pureCohort) {
        const cPattern = pureCohort.split('').join('\\s*');
        query.cohort = { $regex: cPattern, $options: 'i' };
    }
    if (querySubject) {
        const sPattern = querySubject.split('').join('\\s*');
        query.subject = { $regex: sPattern, $options: 'i' };
    }
    if (targetTeacher) {
        const tPattern = targetTeacher.split('').join('\\s*');
        query.teacher = { $regex: tPattern, $options: 'i' };
    }
    const records = await Tracking.find(query).limit(500).lean();
    
    const history = [];
    let totalMinutes = 0;

    records.forEach(row => {
      const dbCohort = extractPureCohort(row.cohort).trim().toLowerCase();
      const dbSubject = normalizeText(row.subject); 
      const dbTeacher = normalizeText(row.teacher);

      if (dbCohort === pureCohort && dbSubject === querySubject) {
        if (!targetTeacher || dbTeacher.includes(targetTeacher)) {
            if (history.length < 500) {
                history.push({
                  _id: row._id,
                  week: parseInt(row.week || "0", 10),
                  date: String(row.date || "").replace(/'/g, "").trim(),
                  time: `${String(row.startTime || "").replace(/'/g, "")} - ${String(row.endTime || "").replace(/'/g, "")}`,
                  lessonNo: String(row.lessonNo || ""),
                  content: String(row.content || ""),
                  hours: String(row.hours || ""),
                  notes: String(row.notes || ""),
                  room: String(row.room || "")
                });
            }

            const hrMatch = String(row.hours || "").match(/(\d+)\s*ម៉ោង/);
            const minMatch = String(row.hours || "").match(/(\d+)\s*នាទី/);
            if (hrMatch) totalMinutes += parseInt(hrMatch[1], 10) * 60;
            if (minMatch) totalMinutes += parseInt(minMatch[1], 10);
        }
      }
    });

    const totalHrs = Math.floor(totalMinutes / 60);
    const totalMins = totalMinutes % 60;
    const totalHoursString = `${totalHrs} ម៉ោង ${totalMins < 10 ? '0'+totalMins : totalMins} នាទី`;

    history.sort((a, b) => (b.week || 0) - (a.week || 0));

    res.json({ success: true, data: history, totalHours: totalHoursString });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching history" });
  }
});

// ==========================================
// GET: TEACHER HISTORY (ALL CLASSES)
// ==========================================
router.get("/teacher-history", noCache, async (req, res) => {
  try {
    const { teacher } = req.query;
    if (!teacher) return res.status(400).json({ success: false, message: "Teacher required" });

    const targetTeacher = normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));

    const tPattern = targetTeacher.split('').join('\\s*');
    const records = await Tracking.find({ teacher: { $regex: tPattern, $options: 'i' } }).limit(500).lean();
    
    const history = [];

    records.forEach(row => {
      const dbTeacher = normalizeText(row.teacher || '');

      if (targetTeacher && dbTeacher.includes(targetTeacher)) {
          if (history.length < 500) {
              history.push({
                _id: row._id,
                major: String(row.major || "").trim(),
                generation: String(row.generation || "").trim(),
                subject: String(row.subject || "").trim(),
                cohort: String(row.cohort || "").trim(),
                date: String(row.date || "").replace(/'/g, "").trim(),
                startTime: String(row.startTime || "").replace(/'/g, "").trim(),
                endTime: String(row.endTime || "").replace(/'/g, "").trim(),
                hours: String(row.hours || "").trim()
              });
          }
      }
    });

    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ success: true, data: history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching teacher history" });
  }
});

// ==========================================
// PUT: EDIT CLASS HISTORY
// ==========================================
router.put("/class-history", noCache, async (req, res) => {
  try {
    const { id, cohort, week, date, lessonNo, content, notes, startTime, endTime, subject, teacher } = req.body;
    
    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = normalizeText(subject);
    let targetTeacher = teacher ? normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '')) : "";

    let targetDoc = null;
    let substituteFor = null;
    let isExtraClass = false;

    if (id && id !== 'undefined' && id !== 'null') {
       targetDoc = await Tracking.findById(id);
    }

    if (!targetDoc) {
       const query = { week: week };
       if (pureCohort) {
           const cPattern = pureCohort.split('').join('\\s*');
           query.cohort = { $regex: cPattern, $options: 'i' };
       }
       if (querySubject) {
           const sPattern = querySubject.split('').join('\\s*');
           query.subject = { $regex: sPattern, $options: 'i' };
       }
       if (targetTeacher) {
           const tPattern = targetTeacher.split('').join('\\s*');
           query.teacher = { $regex: tPattern, $options: 'i' };
       }
       targetDoc = await Tracking.findOne(query);
    }

    if (!targetDoc) {
      return res.status(404).json({ success: false, message: "Class not found for this week" });
    }

    const noteStr = String(targetDoc.notes || "");
    if (noteStr.includes('បង្រៀនជំនួស')) {
        isExtraClass = true;
        const subMatch = noteStr.match(/បង្រៀនជំនួសs+([ws]+)$/i);
        if (subMatch && subMatch[1]) {
            substituteFor = normalizeText(subMatch[1]);
        }
    }

    const safeDate = String(date || "");
    const safeStartTime = String(startTime || "");
    const safeEndTime = String(endTime || "");
    
    let newHours = targetDoc.hours;
    if (safeStartTime && safeEndTime) {
        try {
            const parseTime = (t) => {
                const [time, modifier] = (t || "").trim().split(' ');
                if (!time) return 0;
                let [h, m] = time.split(':');
                h = parseInt(h, 10) || 0;
                m = parseInt(m, 10) || 0;
                if (modifier && modifier.toUpperCase() === 'PM' && h < 12) h += 12;
                if (modifier && modifier.toUpperCase() === 'AM' && h === 12) h = 0;
                return h * 60 + m;
            };
            const m1 = parseTime(safeStartTime);
            const m2 = parseTime(safeEndTime);
            let diff = m2 - m1;
            if (diff < 0) diff += 24 * 60;
            if (diff > 0) {
                newHours = `${Math.floor(diff / 60)} ម៉ោង ${diff % 60} នាទី`;
            }
        } catch(e) {}
    }

    targetDoc.date = safeDate;
    targetDoc.startTime = safeStartTime;
    targetDoc.endTime = safeEndTime;
    targetDoc.lessonNo = String(lessonNo || "");
    targetDoc.content = String(content || "");
    targetDoc.hours = newHours;
    targetDoc.notes = String(notes || "");

    await targetDoc.save();

    sseEmitter.emit('tracking_updated');

    res.json({ success: true, message: "Updated successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// ==========================================
// DELETE: CLASS HISTORY
// ==========================================
router.delete("/class-history", noCache, async (req, res) => {
  try {
    const { id, cohort, week, subject, teacher, date } = req.query;
    
    const pureCohort = extractPureCohort(cohort).trim().toLowerCase();
    const querySubject = normalizeText(subject);
    let targetTeacher = teacher ? normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '')) : "";

    let targetDoc = null;
    let deletedDate = "";
    let substituteFor = null;
    let isExtraClass = false;

    if (id && id !== 'undefined' && id !== 'null') {
       targetDoc = await Tracking.findById(id);
    }

    if (!targetDoc) {
       const query = { week: week };
       if (pureCohort) {
           const cPattern = pureCohort.split('').join('\\s*');
           query.cohort = { $regex: cPattern, $options: 'i' };
       }
       if (querySubject) {
           const sPattern = querySubject.split('').join('\\s*');
           query.subject = { $regex: sPattern, $options: 'i' };
       }
       if (targetTeacher) {
           const tPattern = targetTeacher.split('').join('\\s*');
           query.teacher = { $regex: tPattern, $options: 'i' };
       }
       targetDoc = await Tracking.findOne(query);
    }

    if (targetDoc) {
        deletedDate = String(targetDoc.date || "").replace(/'/g, "").trim();
        const noteStr = String(targetDoc.notes || "");
        if (noteStr.includes('បង្រៀនជំនួស')) {
            isExtraClass = true;
            const subMatch = noteStr.match(/បង្រៀនជំនួស\s+([\w\s]+)$/i);
            if (subMatch && subMatch[1]) {
                substituteFor = normalizeText(subMatch[1]);
            }
        }
    }

    if (!targetDoc) return res.status(404).json({ success: false, message: "Record not found" });

    await Tracking.findByIdAndDelete(targetDoc._id);

    sseEmitter.emit('tracking_updated');

    if (deletedDate && !isExtraClass) {
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });
        await markVisualAttendance(sheets, cohort, subject, teacher, deletedDate, "", substituteFor); 
    }
    
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" }); 
  }
});

// ==========================================
// GET: ADMIN TRACKING DIRECTORY
// ==========================================
router.get('/tracking-directory', noCache, async (req, res) => {
  try {
    const avatars = await Avatar.find();
    let avatarMap = {};
    avatars.forEach(av => {
      if (av.nameKh && av.avatarUrl) {
        const cleanName = normalizeText(av.nameKh.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));
        avatarMap[cleanName] = av.avatarUrl;
        avatarMap[normalizeText(av.nameKh)] = av.avatarUrl;
      }
    });

    const groupedRecords = await Tracking.aggregate([
      {
        $group: {
          _id: { cohort: "$cohort", subject: "$subject", teacher: "$teacher" },
          department: { $first: "$department" },
          major: { $first: "$major" },
          generation: { $first: "$generation" },
          year: { $first: "$year" },
          semester: { $first: "$semester" },
          filledWeeks: { $addToSet: "$week" }
        }
      }
    ]);
    
    const closedDocs = await ClosedClass.find();
    const closedClasses = closedDocs.map(c => c.key);

    const dirMap = {};

    groupedRecords.forEach(group => {
      const row = group._id;
      const dept = group.department || "Unknown Department";
      const major = group.major || "Unknown Major";
      const generation = group.generation || "Unknown Generation";
      const year = group.year || "?";
      const semester = group.semester || "?";
      const subject = String(row.subject).trim();
      const cohort = extractPureCohort(row.cohort).trim(); 
      const teacher = String(row.teacher || "Unknown Teacher");

      const cleanTeacherName = teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, '').trim();
      const key = `${cohort}_${subject}_${cleanTeacherName}`;
      
      const parsedWeeks = group.filledWeeks.filter(w => !isNaN(parseInt(w, 10))).map(w => parseInt(w, 10));

      if (!dirMap[key]) {
          let normalizedTeacher = normalizeText(cleanTeacherName);
          let avatarUrl = avatarMap[normalizedTeacher] || avatarMap[normalizeText(teacher)] || null;
          
          dirMap[key] = {
              key: key,
              tab: `${cohort}-${cleanTeacherName}-${subject}`, 
              cohort: cohort,
              generation: generation, 
              year: year, 
              semester: semester, 
              department: dept, 
              major: major, 
              subject: subject, 
              teacher: cleanTeacherName, 
              avatarUrl: avatarUrl, 
              filledWeeks: [...parsedWeeks],
              isClosed: closedClasses.includes(key)
          };
      } else {
          parsedWeeks.forEach(w => {
              if (!dirMap[key].filledWeeks.includes(w)) {
                  dirMap[key].filledWeeks.push(w);
              }
          });
      }
    });

    res.json({ success: true, data: Object.values(dirMap) });
  } catch (error) {
    console.error("Error loading directory:", error);
    res.status(500).json({ success: false, message: "Error loading directory" });
  }
});


// GET: ALL HISTORICAL CLASSES FOR A TEACHER
router.get("/my-full-history", noCache, async (req, res) => {
  try {
    const { teacher } = req.query;
    if (!teacher) return res.status(400).json({ success: false, message: "Teacher required" });

    const targetTeacher = normalizeText(teacher.replace(/លោកគ្រូ|អ្នកគ្រូ|Dr\.|Dr/gi, ''));

    const regexPattern = targetTeacher.split('').join('\\s*');
    const records = await Tracking.find({ teacher: { $regex: regexPattern, $options: 'i' } })
                                  .sort({ createdAt: -1 })
                                  .limit(500)
                                  .lean();
    
    const allHistory = records.map(row => ({
      _id: row._id,
      department: String(row.department || ""),
      major: String(row.major || ""),
      generation: String(row.generation || ""),
      year: String(row.year || ""),
      semester: String(row.semester || ""),
      subject: String(row.subject || ""),
      cohort: String(row.cohort || ""),
      week: parseInt(row.week || "0", 10),
      date: String(row.date || "").replace(/'/g, ""),
      time: `${String(row.startTime || "").replace(/'/g, "")} - ${String(row.endTime || "").replace(/'/g, "")}`,
      lessonNo: String(row.lessonNo || ""),
      content: String(row.content || ""),
      hours: String(row.hours || ""),
      notes: String(row.notes || ""),
      room: String(row.room || "")
    }));

    res.json({ success: true, data: allHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching full history" });
  }
});

module.exports = router;
