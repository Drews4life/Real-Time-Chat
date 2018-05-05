var socket = io();

socket.on("connect", function()  {
    console.log("Client detected a user");  
});

socket.on("newMessage", function(message) {
    console.log("New Message: ", message);
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    jQuery("#messagesList").append(li);
});

socket.on("disconnect", function()  {
    console.log("Disconnected form the server");
});

socket.on("newUser", function(message){
    console.log("Welcome message: ", message);
});


jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function(){

    });
});

var locationButton = jQuery("#send-location");
location.on("click", function() {
    if(!navigator.geolocation) {
       return alert("Geolocation is not supported!");
    } 
    
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
    }, function() {
        alert("Unable to fetch location");
    });
    
});