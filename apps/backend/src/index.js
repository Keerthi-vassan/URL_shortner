const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const urlRoutes = require("./routes/url.js");

app.use("/api/urls",urlRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "URL Shortener API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

