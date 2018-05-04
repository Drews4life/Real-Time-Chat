const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("Hello!");


    socket.on("createMessage", (message) =>{
        console.log(message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});


app.get("/", (req, res) => {
    res.render("index.html");
})

server.listen(port, () => {
    console.log(`Up and running on port: ${port}`);
})