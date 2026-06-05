const express = require("express");
const cors = require("cors");

// Import Routers
const teacherRoutes = require("./routes/teacherRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount the routes with the '/api' prefix
app.use("/api", teacherRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", trackingRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "DUC Tracking API is awake and running perfectly!" 
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Secure Server running on http://localhost:${PORT}`);
});