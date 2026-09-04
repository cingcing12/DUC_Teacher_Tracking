const { google } = require("googleapis");
const { auth, SPREADSHEETS } = require("./config/googleClient");

async function run() {
    try {
        console.log("Connecting to Google Sheets...");
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        console.log("Generating 50,000 rows for Chheang Vuthy testing...");
        const rows = [];
        for(let i = 1; i <= 50000; i++) {
            rows.push([
                "IT", // Department
                "NW", // Major (based on G1-NW-A)
                "ជំនាន់ទី 1", // Generation
                "4", // Year
                "1", // Semester
                "System Analyze and Design", // Subject
                "G1-NW-A", // Cohort
                "លោកគ្រូ ឈាង វុទ្ធី", // Teacher
                String(Math.floor(i / 10) + 1), // Week
                "'09/04/2026", // Date
                "'01:00 PM", // Start Time
                "'04:00 PM", // End Time
                String(i), // Lesson No
                "Vuthy Performance Testing Row " + i, // Content
                "3 ម៉ោង 00 នាទី", // Hours (1 PM to 4 PM is 3 hours)
                "Auto Generated 50k Test Vuthy", // Notes
                "DUC2" // Room
            ]);
        }

        console.log("Pushing to Google Sheets in batches of 5,000...");
        for (let i = 0; i < rows.length; i += 5000) {
            const batch = rows.slice(i, i + 5000);
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEETS.TRACKING,
                range: "'MasterTracking'!A:Q",
                valueInputOption: "USER_ENTERED",
                insertDataOption: "INSERT_ROWS",
                requestBody: { values: batch }
            });
            console.log(`Inserted ${i + batch.length} / 50000`);
            await new Promise(r => setTimeout(r, 2000)); // Sleep 2 seconds to respect API rate limits
        }

        console.log("✅ Successfully inserted 50,000 rows for Vuthy!");
        process.exit(0);
    } catch (error) {
        console.error("Error inserting data:", error);
        process.exit(1);
    }
}

run();
