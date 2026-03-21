const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const { nanoid } = require("nanoid")
const prisma = require("./prisma")

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// POST /urls - create short URL
app.post("/urls", async (req, res) => {
  const { originalUrl } = req.body
  if (!originalUrl) return res.status(400).json({ error: "originalUrl is required" })

  const shortCode = nanoid(7)
  const url = await prisma.url.create({
    data: { originalUrl, shortCode },
  })
  res.status(201).json(url)
})

// GET /urls - list all URLs
app.get("/urls", async (req, res) => {
  const urls = await prisma.url.findMany({
    orderBy: { createdAt: "desc" },
  })
  res.json(urls)
})

// GET /urls/:shortCode - find a URL by shortCode
app.get("/urls/:shortCode", async (req, res) => {
  const { shortCode } = req.params
  const url = await prisma.url.findUnique({ where: { shortCode } })
  if (!url) return res.status(404).json({ error: "URL not found" })
  res.json(url)
})

app.get("/health", (req, res) => res.json({ status: "ok", service: "shortener" }))

app.listen(PORT, () => console.log(`Shortener service running on port ${PORT}`))