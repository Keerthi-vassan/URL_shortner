const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST"],
}))

const SHORTENER_URL = process.env.SHORTENER_URL || "http://localhost:3001"
const REDIRECT_URL = process.env.REDIRECT_URL || "http://localhost:3002"

app.use("/api/urls", createProxyMiddleware({
  target: SHORTENER_URL,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req) => {
      proxyReq.path = "/urls" + (req.url === "/" ? "" : req.url)
    }
  }
}))

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "gateway" })
})

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params
  const response = await fetch(`${REDIRECT_URL}/${shortCode}`, {
    redirect: "manual"
  })
  const location = response.headers.get("location")
  if (location) {
    res.redirect(location)
  } else {
    res.status(404).json({ error: "URL not found" })
  }
})

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`))