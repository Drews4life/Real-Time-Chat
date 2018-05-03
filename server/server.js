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

    // socket.emit("newEmail", {
    //     from: "joshua@gmail.com",
    //     text: "Hella nice man",
    //     createdAt: new Date().getTime()
    // });

    // socket.emit("newMessage", (message) => {
    //     console.log(message);
    // });

    // socket.on("createEmail", (newEmail) => {
    //     console.log(newEmail);
    // });
    socket.emit("newMessage", {
        from: "Tayk",
        to: "Zendelia",
        createdAt: new Date().getDate()
    });

    socket.on("createMessage",function(data) {
        console.log(data)
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