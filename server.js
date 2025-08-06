require('dotenv').config({ path: './backend/.env' });

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./backend/config/db");
const authRoutes = require ("./backend/routes/authRoutes");
const incomeRoutes = require("./backend/routes/incomeRoutes");
const expenseRoutes = require("./backend/routes/expenseRoutes");
const dashboardRoutes = require("./backend/routes/dashboardRoutes");

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));