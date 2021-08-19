const express = require("express")
const path = require("path")
const hbs = require("hbs")
const { makeRequest, parseResult } = require("./jisho")

// Express config
const app = express()
app.use(express.static(path.join(__dirname, "../public/")))
// Handlebars config
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../public"))
hbs.registerPartials(path.join(__dirname, "../public"))

// Express endpoints
app.get("/", async (req, res) => { // Main page
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/search", async (req, res) => { // Results page
    if (!req.query.word) return res.status(400).send()
    const results = await makeRequest(req.query.word, 10)
    const parsedResults = results.map(r=>parseResult(r))
    res.render("results", { results : parsedResults })
})

app.get("/about", async (req, res) => { // About page
    res.sendFile(path.join(__dirname, "../public/about.html"))
})

app.get("/query", async (req, res) => { // Query page
    if (!req.query.word) return res.status(400).send()
    const results = await makeRequest(req.query.word, req.query.max ? req.query.max : 5)
    res.send(results.map(r=>parseResult(r)))
})



// Express init
app.listen(process.env.PORT, () => console.log("Listening on port ", process.env.PORT))