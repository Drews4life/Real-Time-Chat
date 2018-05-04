var socket = io();

socket.on("connect", function()  {
    console.log("Client detected a user");  
});

socket.on("newMessage", function(message) {
    console.log("New Message: ", message);
});

socket.on("disconnect", function()  {
    console.log("Disconnected form the server");
});
