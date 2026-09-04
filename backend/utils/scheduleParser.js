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

const normalize = (str) => {
  return String(str || "").replace(/\s+/g, '').toLowerCase();
};

const cleanTeacherName = (str) => {
    return normalize(str.replace(/លោកគ្រូ|អ្នកគ្រូ|បណ្ឌិត|សាស្ត្រាចារ្យ|Dr\./g, ""));
};

const extractTabMeta = (tabName) => {
    let generation = "?";
    let year = "?";
    let semester = "?";

    const khmerToArabic = {'១':'1','២':'2','៣':'3','៤':'4','៥':'5','៦':'6','៧':'7','៨':'8','៩':'9','០':'0'};
    const parseNum = (str) => {
        if (!str) return "?";
        let match = str.match(/([០-៩1-9])/);
        if (match) return khmerToArabic[match[1]] || match[1];
        return "?";
    };

    if (tabName.includes("ជំនាន់ទី")) {
        const genPart = tabName.split("ជំនាន់ទី")[1].trim().split(" ")[0];
        generation = parseNum(genPart);
    }
    
    if (tabName.includes("ឆ្នាំសិក្សាមូលដ្ឋាន") || tabName.includes("ឆ្នាំទី១")) {
        year = "1";
    } else if (tabName.includes("ឆ្នាំទី")) {
        const yrPart = tabName.split("ឆ្នាំទី")[1].trim().split(" ")[0];
        year = parseNum(yrPart);
    }

    if (tabName.includes("ឆមាសទី")) {
        const semPart = tabName.split("ឆមាសទី")[1].trim().split(" ")[0];
        semester = parseNum(semPart);
    }

    return { generation, year, semester };
};

const filterClosedClasses = (classesArray, closedClasses) => {
    if (!closedClasses || closedClasses.length === 0) return classesArray;
    return classesArray.filter(cls => {
        const cohort = cls.cohort || cls.group;
        const teacher = cls.teacher || cls.teacherName || "";
        const pureCohort = extractPureCohort(cohort);
        const cleanTName = cleanTeacherName(teacher);
        
        const isClosed = closedClasses.some(closedKey => {
            const normKey = normalize(closedKey);
            return normKey.includes(normalize(pureCohort)) && 
                   normKey.includes(normalize(cls.subject)) && 
                   normKey.includes(cleanTName);
        });
        return !isClosed;
    });
};

const mapDayToEnglish = (khmerOrMixed) => {
    const s = khmerOrMixed.toLowerCase();
    if (s.includes('ច័ន្ទ') || s.includes('monday')) return 'Monday';
    if (s.includes('អង្គារ') || s.includes('tuesday')) return 'Tuesday';
    if (s.includes('ពុធ') || s.includes('wednesday')) return 'Wednesday';
    if (s.includes('ព្រហស្បតិ៍') || s.includes('thursday')) return 'Thursday';
    if (s.includes('សុក្រ') || s.includes('friday')) return 'Friday';
    if (s.includes('សៅរ៍') || s.includes('saturday')) return 'Saturday';
    if (s.includes('អាទិត្យ') || s.includes('sunday')) return 'Sunday';
    return khmerOrMixed.split("-")[0].trim();
};

const parseAttendanceTab = (tabName, rows, facultiesList, majorsList) => {
    const classes = [];
    if (!rows || rows.length < 7) return classes;

    const tabMeta = extractTabMeta(tabName);

    // Pre-sort lists by key length descending so longer exact matches win
    const sortedFaculties = facultiesList && facultiesList.length > 0 
        ? [...facultiesList].sort((a, b) => (String(b[0] || '').length) - (String(a[0] || '').length)) 
        : [];
        
    const sortedMajors = majorsList && majorsList.length > 0 
        ? [...majorsList].sort((a, b) => (String(b[0] || '').length) - (String(a[0] || '').length)) 
        : [];

    let currentDay = "Unknown";
    
    // Row 6 (index 5) has headers. Data starts from index 6.
    for (let i = 6; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        const colA = String(row[0] || "").trim();
        const colB = String(row[1] || "").trim();
        
        if (colA.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(colA)) {
            currentDay = mapDayToEnglish(colA); 
            continue;
        }
        
        if (colB && colB.includes(":")) {
            const time = colB;
            const subject = String(row[2] || "").trim();
            const teacher = String(row[3] || "").trim();
            const room = String(row[4] || "").trim();
            const major = String(row[5] || "").trim();
            const group = String(row[6] || "").trim();
            
            if (!subject || !teacher) continue;
            
            const normalizedGroup = String(group || '').replace(/[\s-]/g, '').toLowerCase();

            classes.push({
                scheduleType: "Attendance Tab",
                attendanceTabName: tabName,
                day: currentDay,
                time: time,
                room: room,
                group: group,
                cohort: group,
                subject: subject,
                generation: tabMeta.generation,
                year: tabMeta.year,
                semester: tabMeta.semester,
                department: (() => {
                    if (sortedFaculties.length > 0) {
                        const match = sortedFaculties.find(r => {
                            if (!r[0]) return false;
                            const normalizedKey = String(r[0]).replace(/[\s-]/g, '').toLowerCase();
                            return normalizedGroup.includes(normalizedKey);
                        });
                        if (match && match[1]) return String(match[1]).trim();
                    }
                    return "?";
                })(),
                majorName: (() => {
                    if (sortedMajors.length > 0) {
                        const match = sortedMajors.find(r => {
                            if (!r[0]) return false;
                            const normalizedKey = String(r[0]).replace(/[\s-]/g, '').toLowerCase();
                            return normalizedGroup.includes(normalizedKey);
                        });
                        if (match && match[1]) return String(match[1]).trim();
                    }
                    return "?";
                })(),
                teacherName: teacher,
                teacher: teacher,
                cleanTeacherName: cleanTeacherName(teacher),
                key: `${extractPureCohort(group)}_${subject}_${teacher}`
            });
        }
    }
    return classes;
};

module.exports = {
    extractPureCohort,
    normalize,
    cleanTeacherName,
    extractTabMeta,
    filterClosedClasses,
    parseAttendanceTab
};
