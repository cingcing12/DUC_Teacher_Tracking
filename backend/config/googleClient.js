const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "./google-credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Centralized Database IDs
const SPREADSHEETS = {
  TEACHER: "1jdTx9XisFojtmLYqi_OOc6r6OaL-7vivBtK0KKN9cLg",
  SCHEDULE: "1iemPJfrKVsVxcxd6KxGF_7J2ZotPJXCywkYuPKO00OA",
  TRACKING: "1txkryjXYAnaaRKqptBUcOTYtQ12dK-ZC1wU9WZJgETc" // Brought this out from the routes!
};

module.exports = { google, auth, SPREADSHEETS };