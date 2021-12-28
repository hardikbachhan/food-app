const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\views\\index.html")
})

app.get("/about", (req, res) => {
    res.sendFile("\\views\\about.html", {root: __dirname})
})

//redirects
app.get("/about-us", (req, res) => {
    res.redirect("/about")
})

//404 page
app.use((req, res) => {
    res.status(404).sendFile("\\views\\404.html", {root: __dirname})
})
// middleware function use() is placed at bottom to handle 404 requests
// placement is very important as if app.use is placed at top, every route
// will be responded with 404 page.

app.listen(3000)


