const {generateMessage} = require("./utils/message.js");
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

    socket.emit("newMessage", generateMessage("Admin", "Hello new user!"));
    
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined!"));    


    socket.on("createMessage", (message, callback) =>{
        console.log(message);
        
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("Info from server");
        //socket.broadcast.emit("newMessage", generateMessage(message.from, message.text));
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