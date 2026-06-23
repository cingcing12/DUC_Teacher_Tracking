const express = require("express");
const router = express.Router();
const { google, auth, SPREADSHEETS } = require("../config/googleClient");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const upload = multer({ dest: 'uploads/' });

// ==========================================
// SMART PHONE NORMALIZERS
// ==========================================
const normalizePhone = (phone) => {
  if (!phone) return "";
  return String(phone).replace(/\s+/g, '').replace(/^0+/, '');
};

const getNormalizedPhoneArray = (phoneStr) => {
  if (!phoneStr) return [];
  return String(phoneStr)
    .split(/[\/,;|]/) 
    .map(p => normalizePhone(p))
    .filter(p => p !== "");
};

// ==========================================
// HELPER: GET AVATAR URL
// ==========================================
async function getAvatarUrl(sheets, nameKh, phone) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500", 
    });
    const rows = res.data.values;
    if (!rows) return null;

    const inputPhones = getNormalizedPhoneArray(phone);
    const cleanInputName = nameKh ? String(nameKh).trim() : "";

    for (const row of rows) {
      const sheetNameKh = row[0] ? String(row[0]).trim() : "";
      const sheetPhones = getNormalizedPhoneArray(row[1]);
      const hasPhoneMatch = inputPhones.some(p => sheetPhones.includes(p));

      if (sheetNameKh === cleanInputName && hasPhoneMatch) {
        return row[2]; 
      }
    }
    return null;
  } catch (error) {
    return null; 
  }
}

// ==========================================
// HELPER: PARSE YEAR & SEMESTER
// ==========================================
const parseYearSem = (text) => {
  if (!text) return null;
  const str = String(text).toUpperCase().replace(/\s+/g,'');
  if (str.includes('IV') || str.includes('៤') || str.includes('4')) return 4;
  if (str.includes('III') || str.includes('៣') || str.includes('3')) return 3;
  if (str.includes('II') || str.includes('២') || str.includes('2')) return 2;
  if (str.includes('I') || str.includes('១') || str.includes('1')) return 1;
  return null;
};

// ==========================================
// GET DEPARTMENTS
// ==========================================
router.get("/departments", async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
    });
    const sheetNames = response.data.sheets
      .map((sheet) => sheet.properties.title)
      .filter((name) => !name.toLowerCase().includes("schedule") && !name.toLowerCase().includes("year"));

    res.json({ success: true, data: sheetNames });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not load tabs" });
  }
});

// ==========================================
// GET TEACHERS (DEEP HEADER SCANNER + MERGED ROW FIX)
// ==========================================
router.get("/teachers", async (req, res) => {
  try {
    const tabName = req.query.tab;
    if (!tabName) return res.status(400).json({ success: false, message: "No tab provided" });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tabName}'!A1:BM500`, 
    });
    const rows = response.data.values;
    if (!rows || rows.length < 5) return res.json({ success: true, data: [] });

    let allAvatars = [];
    try {
      const avatarRes = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A2:C500",
      });
      allAvatars = avatarRes.data.values || [];
    } catch(e) {}

    const dynamicSubjectColumns = [];
    let currentYear = 1;
    let currentSem = 1;

    for (let c = 7; c < 65; c++) {
      let yText = "";
      let sText = "";
      let hText = "";

      for (let r = 0; r < Math.min(5, rows.length); r++) {
        const cellText = rows[r][c] ? String(rows[r][c]).toLowerCase().replace(/\s+/g, '') : "";
        if (cellText.includes("ឆ្នាំ") || cellText.includes("year")) yText += cellText;
        if (cellText.includes("ឆមាស") || cellText.includes("sem")) sText += cellText;
        hText += cellText;
      }

      const y = parseYearSem(yText);
      if (y) currentYear = y;

      const s = parseYearSem(sText);
      if (s) currentSem = s;

      if ((hText.includes("អង់គ្លេស") || hText.includes("english") || hText.includes("eng") || hText.includes("មុខវិជ្ជា")) && !hText.includes("ខ្មែរ") && !hText.includes("khmer")) {
          
        let engCol = c;
        let khCol = c + 1;
        let creditCol = c + 2;
        let hourCol = c + 3;

        for(let offset = 0; offset <= 5; offset++) {
          let scanText = "";
          for(let r = 0; r < Math.min(5, rows.length); r++) {
            if (rows[r][c + offset]) scanText += String(rows[r][c + offset]).toLowerCase().replace(/\s+/g, '');
          }
          if(scanText.includes("ខ្មែរ") || scanText.includes("khmer")) khCol = c + offset;
          if(scanText.includes("ក្រេឌីត") || scanText.includes("credit") || scanText.includes("ក្រេឌិត")) creditCol = c + offset;
          if(scanText.includes("ម៉ោង") || scanText.includes("hour")) hourCol = c + offset;
        }

        if (!dynamicSubjectColumns.some(col => col.cols[0] === engCol)) {
          dynamicSubjectColumns.push({
            cols: [engCol, khCol], 
            creditCol: creditCol,
            hourCol: hourCol,
            year: currentYear,
            sem: currentSem
          });
        }
          
        c = Math.max(khCol, creditCol, hourCol);
      }
    }

    const subjectColumns = dynamicSubjectColumns.length > 0 ? dynamicSubjectColumns : [
      { cols: [7, 8], creditCol: 9, hourCol: 10, year: 1, sem: 1 },
      { cols: [12, 13], creditCol: 14, hourCol: 15, year: 1, sem: 2 }
    ];

    const teachers = [];
    let currentClassGroup = "General";
    let lastTeacher = null; 

    for (let i = 4; i < rows.length; i++) {
      const row = rows[i];
      const colA = row[0] ? String(row[0]).trim() : "";
      const colB = row[1] ? String(row[1]).trim() : "";
      const colC = row[2] ? String(row[2]).trim() : "";
      const colD = row[3] ? String(row[3]).trim() : "";
      const colE = row[4] ? String(row[4]).trim() : "";
      const colF = row[5] ? String(row[5]).trim() : "";
      
      const rawRowPhone = row[6] ? String(row[6]).trim() : "N/A";
      const rowPhones = getNormalizedPhoneArray(rawRowPhone);

      const potentialHeader = colB || colA;
      const isJustANumber = !isNaN(potentialHeader) && potentialHeader !== "";

      if (potentialHeader && !isJustANumber && !colC && !colD && !colE && !colF && colB !== "ឈ្មោះគ្រូបង្រៀន") {
        currentClassGroup = potentialHeader;
        lastTeacher = null; 
        continue;
      }

      if (colB && colB !== "ឈ្មោះគ្រូបង្រៀន" && colB !== "No Name") {
        
        let avatarUrl = null;
        for (const av of allAvatars) {
           const avPhones = getNormalizedPhoneArray(av[1]);
           const hasPhoneMatch = avPhones.some(p => rowPhones.includes(p));
           const avNameKh = av[0] ? String(av[0]).trim() : "";
           const targetNameKh = colB.trim();
           
           if (avNameKh === targetNameKh && hasPhoneMatch) {
              avatarUrl = av[2]; break;
           }
        }

        const subjects = [];
        subjectColumns.forEach(({ cols, creditCol, hourCol, year, sem }) => {
          const eng = row[cols[0]] ? String(row[cols[0]]).trim() : "";
          const kh = row[cols[1]] ? String(row[cols[1]]).trim() : "";
          const credit = row[creditCol] ? String(row[creditCol]).trim() : "";
          const hour = row[hourCol] ? String(row[hourCol]).trim() : "";

          if ((eng || kh) && (isNaN(eng) || isNaN(kh))) {
              subjects.push({ eng, kh, credit, hour, year, sem });
          }
        });

        const newTeacherObj = {
          id: colA,
          nameKh: colB,
          nameEn: colC,
          gender: colD,
          degree: colE || "N/A",
          major: colF || "N/A",
          phone: rawRowPhone,
          avatarUrl: avatarUrl,
          subjects,
          classGroup: currentClassGroup,
        };

        teachers.push(newTeacherObj);
        lastTeacher = newTeacherObj; 

      } 
      else if (!colB && lastTeacher) {
        subjectColumns.forEach(({ cols, creditCol, hourCol, year, sem }) => {
          const eng = row[cols[0]] ? String(row[cols[0]]).trim() : "";
          const kh = row[cols[1]] ? String(row[cols[1]]).trim() : "";
          const credit = row[creditCol] ? String(row[creditCol]).trim() : "";
          const hour = row[hourCol] ? String(row[hourCol]).trim() : "";

          if ((eng || kh) && (isNaN(eng) || isNaN(kh))) {
              lastTeacher.subjects.push({ eng, kh, credit, hour, year, sem });
          }
        });
      }
    }
    
    res.json({ success: true, data: teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error reading sheet data" });
  }
});

// ==========================================
// 🔥 UPDATE ROUTE FOR TEACHERS (DYNAMIC INSERT & AUTO-MERGE)
// ==========================================
router.post("/update-teacher", async (req, res) => {
  try {
    const { tab, teacher } = req.body;
    if (!tab || !teacher || !teacher.nameKh) {
      return res.status(400).json({ success: false, message: "Missing required data" });
    }

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TEACHER });
    const targetSheet = sheetInfo.data.sheets.find(s => s.properties.title === tab);
    if (!targetSheet) return res.status(404).json({ success: false, message: "Sheet tab not found" });
    const sheetId = targetSheet.properties.sheetId;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tab}'!A1:BM500`,
    });
    const rows = response.data.values;
    if (!rows) return res.status(404).json({ success: false, message: "Sheet not found" });

    let targetRowIdx = -1;
    for (let i = 4; i < rows.length; i++) {
      const rowNameKh = rows[i][1] ? String(rows[i][1]).trim() : "";
      if (rowNameKh === teacher.nameKh) {
        targetRowIdx = i;
        break;
      }
    }
    if (targetRowIdx === -1) return res.status(404).json({ success: false, message: "Teacher not found in spreadsheet" });

    let teacherBlockIndices = [targetRowIdx];
    for (let i = targetRowIdx + 1; i < rows.length; i++) {
      const colA = rows[i][0] ? String(rows[i][0]).trim() : "";
      const colB = rows[i][1] ? String(rows[i][1]).trim() : "";
      if (colB !== "" || (colA !== "" && isNaN(colA))) break;
      teacherBlockIndices.push(i);
    }

    const slots = {}; 
    let currentYear = 1, currentSem = 1;

    for (let c = 7; c < 65; c++) {
      let yText = "", sText = "", hText = "";
      for (let r = 0; r < Math.min(5, rows.length); r++) {
        const cellText = rows[r][c] ? String(rows[r][c]).toLowerCase().replace(/\s+/g, '') : "";
        if (cellText.includes("ឆ្នាំ") || cellText.includes("year")) yText += cellText;
        if (cellText.includes("ឆមាស") || cellText.includes("sem")) sText += cellText;
        hText += cellText;
      }

      const y = parseYearSem(yText);
      if (y) currentYear = y;
      const s = parseYearSem(sText);
      if (s) currentSem = s;

      if ((hText.includes("អង់គ្លេស") || hText.includes("english") || hText.includes("eng") || hText.includes("មុខវិជ្ជា")) && !hText.includes("ខ្មែរ") && !hText.includes("khmer")) {
        let engCol = c, khCol = c + 1, creditCol = c + 2, hourCol = c + 3;
        for(let offset = 0; offset <= 5; offset++) {
          let scanText = "";
          for(let r = 0; r < Math.min(5, rows.length); r++) {
            if (rows[r][c + offset]) scanText += String(rows[r][c + offset]).toLowerCase().replace(/\s+/g, '');
          }
          if(scanText.includes("ខ្មែរ") || scanText.includes("khmer")) khCol = c + offset;
          if(scanText.includes("ក្រេឌីត") || scanText.includes("credit") || scanText.includes("ក្រេឌិត")) creditCol = c + offset;
          if(scanText.includes("ម៉ោង") || scanText.includes("hour")) hourCol = c + offset;
        }

        if (!slots[currentYear]) slots[currentYear] = {};
        if (!slots[currentYear][currentSem]) slots[currentYear][currentSem] = [];
        if (!slots[currentYear][currentSem].some(slot => slot.engCol === engCol)) {
          slots[currentYear][currentSem].push({ engCol, khCol, creditCol, hourCol });
        }
        c = Math.max(khCol, creditCol, hourCol); 
      }
    }

    let maxRowsNeeded = teacherBlockIndices.length;
    const slotCounts = {};
    if (teacher.subjects && Array.isArray(teacher.subjects)) {
      for (const sub of teacher.subjects) {
        const y = String(sub.year).trim();
        const s = String(sub.sem).trim();
        if (slots[y] && slots[y][s]) {
          const key = `${y}-${s}`;
          slotCounts[key] = (slotCounts[key] || 0) + 1;
          const hAvail = slots[y][s].length;
          const required = Math.ceil(slotCounts[key] / hAvail);
          if (required > maxRowsNeeded) maxRowsNeeded = required;
        }
      }
    }

    let blockData = teacherBlockIndices.map(idx => {
      let r = [...rows[idx]];
      while(r.length < 65) r.push("");
      return r;
    });

    const rowsToAdd = maxRowsNeeded - blockData.length;
    if (rowsToAdd > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TEACHER,
        requestBody: {
          requests: [{
            insertDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: targetRowIdx + blockData.length,
                endIndex: targetRowIdx + blockData.length + rowsToAdd
              },
              inheritFromBefore: true
            }
          }]
        }
      });
      for (let i = 0; i < rowsToAdd; i++) blockData.push(new Array(65).fill(""));
    }

    for (let r = 0; r < blockData.length; r++) {
      for (const y in slots) {
        for (const s in slots[y]) {
          slots[y][s].forEach(slot => {
            blockData[r][slot.engCol] = "";
            blockData[r][slot.khCol] = "";
            blockData[r][slot.creditCol] = "";
            blockData[r][slot.hourCol] = "";
          });
        }
      }
    }

    blockData[0][0] = teacher.id || blockData[0][0] || "";
    blockData[0][1] = teacher.nameKh || blockData[0][1] || "";
    blockData[0][2] = teacher.nameEn || blockData[0][2] || "";
    blockData[0][3] = teacher.gender || blockData[0][3] || "";
    blockData[0][4] = teacher.degree || blockData[0][4] || "";
    blockData[0][5] = teacher.major || blockData[0][5] || "";
    blockData[0][6] = teacher.phone || blockData[0][6] || "";

    const usedSlots = {};
    if (teacher.subjects && Array.isArray(teacher.subjects)) {
      for (const sub of teacher.subjects) {
        const y = String(sub.year).trim();
        const s = String(sub.sem).trim();
        
        if (slots[y] && slots[y][s]) {
          const key = `${y}-${s}`;
          if (!usedSlots[key]) usedSlots[key] = 0;
          const currentSlotIndex = usedSlots[key];
          
          const hAvail = slots[y][s].length;
          const hIndex = currentSlotIndex % hAvail;
          const vIndex = Math.floor(currentSlotIndex / hAvail);
          
          if (vIndex < blockData.length) {
            const slot = slots[y][s][hIndex];
            blockData[vIndex][slot.engCol] = sub.eng || "";
            blockData[vIndex][slot.khCol] = sub.kh || "";
            blockData[vIndex][slot.creditCol] = sub.credit || "";
            blockData[vIndex][slot.hourCol] = sub.hour || "";
            usedSlots[key]++;
          }
        }
      }
    }

    const startRow = targetRowIdx + 1; 
    const endRow = targetRowIdx + blockData.length; 
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEETS.TEACHER,
      range: `'${tab}'!A${startRow}:BM${endRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: blockData }
    });

    if (blockData.length > 1) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TEACHER,
        requestBody: {
          requests: [
            {
              unmergeCells: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: targetRowIdx,
                  endRowIndex: targetRowIdx + blockData.length,
                  startColumnIndex: 0,
                  endColumnIndex: 7
                }
              }
            },
            {
              mergeCells: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: targetRowIdx,
                  endRowIndex: targetRowIdx + blockData.length,
                  startColumnIndex: 0,
                  endColumnIndex: 7
                },
                mergeType: "MERGE_COLUMNS"
              }
            }
          ]
        }
      }).catch(e => console.log("Merge completed or skipped if identical."));
    }

    res.json({ success: true, message: "Teacher updated perfectly in Google Sheets!" });
  } catch(error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Server error during update" });
  }
});


// ==========================================
// 🔥 SECURE LOGIN: EMAIL & PASSWORD
// ==========================================
const cleanTeacherName = (str) => {
  if (!str) return "";
  return String(str)
    .replace(/លោកគ្រូ|អ្នកគ្រូ/g, "")
    .replace(/\u200B/g, "")
    .trim();
};

const TEACHER_DATA_SHEET_ID = "1wCRweEDDuNIZtXYq-qiOSIE-zYgvMQ2zA8m594DtevQ"; 
const TEACHER_DATA_TAB = "ទិន្នន័យលោកគ្រូអ្នកគ្រូ";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password required" });
    }

    const cleanInputEmail = email.trim().toLowerCase();
    const cleanInputPassword = password.trim(); 

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: TEACHER_DATA_SHEET_ID, 
      range: `'${TEACHER_DATA_TAB}'!A2:Q`
    });

    const rows = response.data.values || [];
    let loggedInTeacher = null;

    for (const row of rows) {
      const dbPhone = String(row[9] || "").trim();               // Column J (Index 9)
      const dbEmail = String(row[10] || "").trim().toLowerCase(); // Column K (Index 10)
      
      // 🔥 THE FIX IS RIGHT HERE:
      const dbPassword = String(row[14] || "").trim();           // Column O (Index 14)
      const isBlocked = String(row[15] || "").trim().toUpperCase() === "TRUE"; // Column P (Index 15)

      if (dbEmail === cleanInputEmail && dbPassword === cleanInputPassword) {
        
        if (isBlocked) {
          return res.status(403).json({ success: false, message: "Your account is currently blocked. Please contact Admin." });
        }

        loggedInTeacher = { 
          id: String(row[0] || ""), 
          nameKh: String(row[1] || "").trim(), 
          nameEn: String(row[2] || "").trim(), 
          gender: String(row[4] || "").trim(), 
          degree: String(row[7] || "").trim(), 
          major: String(row[8] || "").trim(),  
          phone: dbPhone, 
          email: dbEmail
        };
        break;
      }
    }

    if (!loggedInTeacher) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password!" });
    }

    // 2. FETCH THE AVATAR 
    loggedInTeacher.avatarUrl = await getAvatarUrl(sheets, loggedInTeacher.nameKh, loggedInTeacher.phone);

    // 3. SCAN DEPARTMENT TABS
    const allSheetsRes = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEETS.TEACHER,
    });
    const sheetNames = allSheetsRes.data.sheets.map((sheet) => sheet.properties.title);
    
    let foundDepartments = []; 
    const cleanInputNameKh = cleanTeacherName(loggedInTeacher.nameKh).toLowerCase();
    const cleanInputNameEn = cleanTeacherName(loggedInTeacher.nameEn).toLowerCase();

    for (const tab of sheetNames) {
      if (tab.toLowerCase().includes("schedule") || tab.toLowerCase().includes("year")) continue;

      const sheetData = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEETS.TEACHER, 
        range: `'${tab}'!A5:C500`, 
      });
      const deptRows = sheetData.data.values;
      if (!deptRows) continue;

      for (const r of deptRows) {
        const dbNameKh = cleanTeacherName(r[1] ? r[1].trim() : "").toLowerCase();
        const dbNameEn = cleanTeacherName(r[2] ? r[2].trim() : "").toLowerCase();
        
        if ((dbNameKh !== "" && dbNameKh === cleanInputNameKh) || (dbNameEn !== "" && dbNameEn === cleanInputNameEn)) {
          if (!foundDepartments.includes(tab)) {
              foundDepartments.push(tab);
          }
          break; 
        }
      }
    }

    loggedInTeacher.department = foundDepartments.join(", ");
    res.json({ success: true, message: "Login successful!", teacher: loggedInTeacher });
    
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ==========================================
// UPLOAD AVATAR & SAVE TO "Avatars" TAB
// ==========================================
router.post("/upload-avatar", upload.single("image"), async (req, res) => {
  try {
    const { nameKh, phone } = req.body; 
    if (!req.file) return res.status(400).json({ success: false, message: "No image provided" });

    const inputPhones = getNormalizedPhoneArray(phone);
    const cleanInputName = nameKh ? String(nameKh).trim() : "";

    const result = await cloudinary.uploader.unsigned_upload(req.file.path, "duc_avatar_upload");
    fs.unlinkSync(req.file.path);
    const imageUrl = result.secure_url;

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
    const allTabs = response.data.sheets;
    let tabExists = false;

    for (const tab of allTabs) {
      if (tab.properties.title === "Avatars") { tabExists = true; break; }
    }

    if (!tabExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TRACKING,
        requestBody: { requests: [{ addSheet: { properties: { title: "Avatars" } } }] }
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A1:C1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [["Name (Khmer)", "Phone Number", "Cloudinary Image URL"]] }
      });
    }

    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500",
    });
    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const sheetNameKh = rows[i][0] ? String(rows[i][0]).trim() : "";
      const sheetPhones = getNormalizedPhoneArray(rows[i][1]);
      const hasPhoneMatch = inputPhones.some(p => sheetPhones.includes(p));

      if (sheetNameKh === cleanInputName && hasPhoneMatch) {
        rowIndex = i + 2; 
        break;
      }
    }

    if (rowIndex !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: `'Avatars'!C${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[imageUrl]] },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A:C",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[cleanInputName, phone, imageUrl]] },
      });
    }

    res.json({ success: true, imageUrl, message: "Avatar updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

// ==========================================
// SET APP AVATAR (DIRECT URL UPDATE)
// ==========================================
router.post("/update-avatar-url", async (req, res) => {
  try {
    const { nameKh, phone, avatarUrl } = req.body;
    if (!nameKh || !phone || !avatarUrl) return res.status(400).json({ success: false, message: "Missing data" });

    const inputPhones = getNormalizedPhoneArray(phone);
    const cleanInputName = nameKh ? String(nameKh).trim() : "";

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEETS.TRACKING });
    const allTabs = response.data.sheets;
    let tabExists = false;

    for (const tab of allTabs) {
      if (tab.properties.title === "Avatars") { tabExists = true; break; }
    }

    if (!tabExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEETS.TRACKING,
        requestBody: { requests: [{ addSheet: { properties: { title: "Avatars" } } }] }
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A1:C1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [["Name (Khmer)", "Phone Number", "Cloudinary Image URL"]] }
      });
    }

    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEETS.TRACKING,
      range: "'Avatars'!A2:C500",
    });
    const rows = getRes.data.values || [];
    let rowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const sheetNameKh = rows[i][0] ? String(rows[i][0]).trim() : "";
      const sheetPhones = getNormalizedPhoneArray(rows[i][1]);
      const hasPhoneMatch = inputPhones.some(p => sheetPhones.includes(p));

      if (sheetNameKh === cleanInputName && hasPhoneMatch) {
        rowIndex = i + 2; 
        break;
      }
    }

    if (rowIndex !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: `'Avatars'!C${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[avatarUrl]] },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEETS.TRACKING,
        range: "'Avatars'!A:C",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[cleanInputName, phone, avatarUrl]] },
      });
    }

    res.json({ success: true, message: "App Avatar updated successfully!" });
  } catch (error) {
    console.error("Update Avatar URL Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;