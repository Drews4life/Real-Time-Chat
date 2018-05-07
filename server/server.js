const {generateMessage, generateLocationMessage} = require("./utils/message.js");
const {isTypeOfString} = require("./utils/validation.js");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const axios = require("axios");
const {Users} = require("./utils/users.js");

const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
     
app.use(express.static(publicPath));

io.on("connection", (socket) => {

    
    socket.on("join", (params, callback) => {
        if(!isTypeOfString(params.name) || !isTypeOfString(params.room)){
            return allback("Name and Room name are required.");
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("Admin", "Hello new user!"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined!`));  
        //empty acknowledge, makes "err" in emits acknowledge empty
        callback();
    });


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
            if(response.data.error_message != undefined){
                var textMSG ="I'm here at the moment, ";
                io.emit("newLocationMessage", generateLocationMessage("Admin", textMSG, message.latitude, message.longitude));
            } else {
                var location = response.data.results[7].address_components[0].long_name;
                var textMSG =`I am in ${location} now, `;
                io.emit("newLocationMessage", generateLocationMessage("Admin", textMSG, message.latitude, message.longitude));              
            }
                
                
            
        }).catch((e) => {
            console.log(e);
        });

    });
    
    socket.on("disconnect", () => {                     
        
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit("updateUserList", users.getUserList(user.room) );
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room`) );
            console.log("smth should happen");
        }
    
        
    });
});


app.get("/", (req, res) => {
    res.render("index.html");
})

server.listen(port, () => {
    console.log(`Up and running on port: ${port}`);
});

