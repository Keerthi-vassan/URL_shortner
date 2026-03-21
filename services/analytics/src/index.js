const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const prisma = require("./prisma")
const { connectConsumer } = require("./kafka")

const app = express()
const PORT = process.env.PORT || 3003

app.use(express.json())

// GET /analytics/:shortCode - get click count for a URL
app.get("/analytics/:shortCode", async (req, res) => {
  const { shortCode } = req.params
  const url = await prisma.url.findUnique({ where: { shortCode } })
  if (!url) return res.status(404).json({ error: "URL not found" })
  res.json({ shortCode, clicks: url.clicks })
})

app.get("/health", (req, res) => res.json({ status: "ok", service: "analytics" }))

const handleClickEvent = async ({ shortCode }) => {
  await prisma.url.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } },
  })
  console.log(`Click recorded for ${shortCode}`)
}

const start = async () => {
  await connectConsumer(handleClickEvent)
  app.listen(PORT, () => console.log(`Analytics service running on port ${PORT}`))
}

start()