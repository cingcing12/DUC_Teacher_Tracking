const { google } = require("googleapis");
const { auth, SPREADSHEETS } = require("./config/googleClient");

async function run() {
    try {
        console.log("Connecting to Google Sheets...");
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        console.log("Generating 50,000 rows for testing...");
        const rows = [];
        for(let i = 1; i <= 50000; i++) {
            rows.push([
                "IT", // Department
                "PG", // Major
                "ជំនាន់ទី 1", // Generation
                "4", // Year
                "1", // Semester
                "Mobile Application Framework II", // Subject
                "G1-PG-B", // Cohort
                "លោកគ្រូ សុខភក្តិ", // Teacher
                String(Math.floor(i / 10) + 1), // Week
                "'09/04/2026", // Date
                "'08:00 AM", // Start Time
                "'12:00 PM", // End Time
                String(i), // Lesson No
                "Performance Testing Content Row " + i, // Content
                "4 ម៉ោង 00 នាទី", // Hours
                "Auto Generated 50k Test", // Notes
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

        console.log("✅ Successfully inserted 50,000 rows!");
        process.exit(0);
    } catch (error) {
        console.error("Error inserting data:", error);
        process.exit(1);
    }
}

run();
