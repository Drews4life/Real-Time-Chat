var socket = io();

socket.on("connect", function()  {
    console.log("Client detected a user");  
});

socket.on("newMessage", function(message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        time: formattedTime
    });

    jQuery("#messages-list").append(html);

    // var formattedTime = moment(message.createdAt).format("h:mm a");
    // console.log("New Message: ", message);
    // var li = jQuery("<li></li>");
    // li.text(` ${formattedTime}. ${message.from}: ${message.text}`);
    // jQuery("#messagesList").append(li);
});

socket.on("disconnect", function()  {
    console.log("Disconnected form the server");
});

socket.on("newUser", function(message){
    console.log("Welcome message: ", message);
});

socket.on("newLocationMessage", function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        url: message.url,
        time: formattedTime
    });

    jQuery("#messages-list").append(html);


    // console.log(JSON.stringify(message));
    // var li = jQuery("<li></li>");
    // var a = jQuery("<a target=\"_blank\">check it out</a>");
    // li.text(`${formattedTime}. ${message.from}: ${message.text}`);
    // a.attr("href", message.url);
    // li.append(a);
    // jQuery("#messages-list").append(li);
});


jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    
    var textBox = jQuery("[name=message]");

    socket.emit("createMessage", {
        from: "User",
        text: textBox.val()
    }, function(){
        textBox.val("");
    });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
    if(!navigator.geolocation) {
       return alert("Geolocation is not supported!");
    } 

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
    });
    
});

