const express = require("express");
const router = express.Router();
const {chatBot} = require("../services/llm");
const path = require("path");

router
    .get("^/$|/llm-test(.html)?", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views", "llm-test.html"));
    })
    .post("^/$|/llm-test(.html)?", async (req, res) => {
        const {question} = req.body;
        if (!question) {
            return res.status(400).send({error: "Question is required"});
        }
        try {
            const response = await chatBot(question);
            res.send({answer: response});
        } catch (error) {
            res.status(500).send({error: "Error processing your question"});
        }
    });

module.exports = router;
