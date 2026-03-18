const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const { nanoid } = require("nanoid");

router.post("/", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Url is required" });
  }

  const shortCode = nanoid(7);

  const url = await prisma.url.create({
    data: { originalUrl, shortCode },
  });

  res.status(201).json(url);
});

router.get("/", async (req, res) => {
  const urls = await prisma.url.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(urls);
});

router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }

  await prisma.url.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } },
  });

  res.redirect(url.originalUrl);
});

module.exports = router;