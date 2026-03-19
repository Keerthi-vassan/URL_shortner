const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST"],
}));
app.use(express.json());

const urlRoutes = require("./routes/url");
app.use("/api/urls", urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "URL Shortener API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});