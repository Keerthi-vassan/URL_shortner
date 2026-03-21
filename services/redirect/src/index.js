const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const prisma = require("./prisma")
const { connectProducer, publishClickEvent } = require("./kafka")

const app = express()
const PORT = process.env.PORT || 3002

app.use(express.json())

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params

  const url = await prisma.url.findUnique({ where: { shortCode } })
  if (!url) return res.status(404).json({ error: "URL not found" })

  // fire and forget - don't wait for kafka
  publishClickEvent(shortCode, url.originalUrl).catch(console.error)

  res.redirect(url.originalUrl)
})

app.get("/health", (req, res) => res.json({ status: "ok", service: "redirect" }))

const start = async () => {
  await connectProducer()
  app.listen(PORT, () => console.log(`Redirect service running on port ${PORT}`))
}

start()