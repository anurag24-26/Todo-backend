require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorMiddleware");

connectDB();
const app = express();

// ✅ Add CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your frontend URL in production
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
