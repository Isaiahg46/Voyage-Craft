import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Database Connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { dialect: "postgres" }) // Use DB_URL if available
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "postgres", // Default to Postgres
        logging: false, // Disable logging for cleaner console output
      }
    );

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// API Route for Testing
app.get("/api", (req, res) => {
  res.json({ message: "API is running!" });
});

// Serve React Frontend (Production Only)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist"))); // Serve built frontend

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
} else {
  console.log("⚠ Running in development mode. React frontend not served.");
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
