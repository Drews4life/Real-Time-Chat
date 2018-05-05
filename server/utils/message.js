const moment = require("moment");

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
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
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};
