var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};


var generateLocationMessage = (from, text, lat, long) => {
    if(text === undefined){
        text = "";
    }

    return {
        from,
        text,
        url: `https://www.google.com/maps?=${lat},${long}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage};
