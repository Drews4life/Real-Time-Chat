const expect = require("expect");
const {isTypeOfString} = require("./validation.js");

describe("isTypeOfString", () => {
    it("Should reject non-string value", () => {
        var string = 12345;
        expect(isTypeOfString(string)).toBeFalsy();
    });

    it("Should reject value with spaces", () => {
        var string = "      ";
        expect(isTypeOfString(string)).toBeFalsy();
    });

    it("Should validate string value", () => {
        var string = "  Ordinary    string      ";
        expect(isTypeOfString(string)).toBeTruthy();
    });
});