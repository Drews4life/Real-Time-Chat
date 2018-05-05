const {generateMessage, generateLocationMessage} = require("./utils/message.js");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const axios = require("axios");

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

    socket.on("createLocationMessage", (message) => {
        var addressString = `${message.latitude},${message.longitude}`;
        var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${addressString}`;

        axios.get(geocodeURL).then((response) => {
            console.log(response.data.results[7].address_components[0].long_name);
            var location = response.data.results[7].address_components[0].long_name;
            if(response.data.status === "ZERO_RESULTS"){
                io.emit("newLocationMessage", generateMessage("Admin", `This location doesnt exist`));
            } else if(response.data.status === "OK"){ //
                var textMSG =`I am in ${location} now, `;
                io.emit("newLocationMessage", generateLocationMessage("Admin", textMSG, message.latitude, message.longitude));
                console.log("message sent");
            } 
        }).catch((e) => {
            console.log(e);
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