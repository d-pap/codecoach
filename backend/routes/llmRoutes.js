const express = require("express")
const router = express.Router()
const { chatBot } = require("../services/llm")

router.post("/llm-test", async (req, res) => {
  const { question } = req.body
  const response = await chatBot(question)
  res.json({ answer: response })
})

module.exports = router
