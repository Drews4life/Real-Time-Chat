const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.render("index.html");
})

app.listen(port, () => {
    console.log(`Up and running on port: ${port}`);
})