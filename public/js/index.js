var socket = io();

socket.on("connect", function()  {
    console.log("Client detected a user");

    // socket.emit("createEmail", {
    //     createdBy: "JoshuaPou",
    //     text: "It was sent from client lol",
    //     createdAt: new Date().getFullYear()
    // });

    
});

socket.on("newMessage", function(data) {
    console.log(data);
});

socket.emit("createMessage", {
        from: "Joshua",
        to: "Fina",
        text: "Hella bby"
    });

socket.on("disconnect", function()  {
    console.log("Disconnected form the server");
});

// socket.on("newEmail", function(mail) {
//     console.log("newEmail called: ", mail);
// });