var expect = require("expect");
var {generateMessage} = require("./message.js");

describe("generateMessage", () => {
    
    it("Should return valid data from generateMessage", () => {
        var result = generateMessage("Drews", "Hello");

        expect(result.from).toBe("Drews");
        expect(result.text).toBe("Hello");
        expect(typeof result.createdAt).toBe("number");
    });

});