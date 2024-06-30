// routing the chatBot function from the llm.js file
const llm = require("../middleware/llm.js");
const express = require("express");
const router = express.Router();
const path = require("path");

router
    .get("^/$|/llm-test(.html)?", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views", "llm-test.html"));
    })
    .post("/llm-test", async (req, res) => {
        const {question} = req.body;
        if (!question) {
            return res.status(400).send({error: "Question is required"});
        }
        try {
            console.log("Question: ", question); // not reaching this line
            const response = await llm.chatBot(question);
            res.send({answer: response});
        } catch (error) {
            res.status(500).send({error: "Error processing your question"});
        }
    });

module.exports = router;
