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

socket.on("newLocationMessage", function(message){
    console.log(message);
    var li = jQuery("<li></li>");
    var a = jQuery("<a target=\"_blank\">check it out</a>");
    li.text(`${message.from}: ${message.text}`);
    a.attr("href", message.url);
    li.append(a);
    jQuery("#messagesList").append(li);
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
locationButton.on("click", function() {
    if(!navigator.geolocation) {
       return alert("Geolocation is not supported!");
    } 

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert("Unable to fetch location");
    });
    
});

