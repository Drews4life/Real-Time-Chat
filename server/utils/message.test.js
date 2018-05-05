var expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message.js");

describe("generateMessage", () => {
    
    it("Should return valid data from generateMessage", () => {
        var result = generateMessage("Drews", "Hello");

        expect(result.from).toBe("Drews");
        expect(result.text).toBe("Hello");
        expect(typeof result.createdAt).toBe("number");
    });

});
describe("generateLocationMessage", () => {
    it("Should generate correct location object", () => {
        var from = "Drews";
        var text = "";
        var lat = 1;
        var long = 1;
        var url = `https://www.google.com/maps?=${lat},${long}`;
        var result = generateLocationMessage(from, text, lat, long);

        expect(typeof result.createdAt).toBe("number");
        expect(result.url).toBe(url);

    });
});