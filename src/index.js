const express = require("express")
const path = require("path")
const { makeRequest, parseResult } = require("./jisho")

// Express config
const app = express()
app.use(express.static("/public"))

// Express endpoints
app.get("/", async (req, res) => { // Main page
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/query", async (req, res) => { // Query page
    if (!req.query.word) return res.status(400).send()
    const results = await makeRequest(req.query.word, req.query.max ? req.query.max : 5)
    res.send(results.map(r=>parseResult(r)))
})

// Express init
app.listen(process.env.PORT, () => console.log("Listening on port ", process.env.PORT))