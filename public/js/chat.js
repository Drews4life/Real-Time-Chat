var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery("#messages-list");
    var newMessage = messages.children("li:last-child");
    //Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
        console.log("SCROLLING HELL YEAH");
    }
};

socket.on("connect", function()  {
    console.log("Client detected a user");
    var params = jQuery.deparam(window.location.search);
    socket.emit("join", params, function(err) {
        if(err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No errors occured");
        }
    });

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
    scrollToBottom();

    // var formattedTime = moment(message.createdAt).format("h:mm a");
    // console.log("New Message: ", message);
    // var li = jQuery("<li></li>");
    // li.text(` ${formattedTime}. ${message.from}: ${message.text}`);
    // jQuery("#messagesList").append(li);
});

socket.on("updateUserList", function(users) {
    var ol = jQuery("<ol></ol");
    users.forEach(function(user){
        ol.append(jQuery("<li></li>").text(user));
        console.log(user);
    });

    jQuery("#users").html(ol);
    console.log("Users: ", users);
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
    scrollToBottom();


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

