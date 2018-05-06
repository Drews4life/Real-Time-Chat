const {Users} = require("./users.js");
const expect = require("expect");

describe("Users", () => {

    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Drew",
            room: "KJen"
        },
        {
            id: "2",
            name: "Kate",
            room: "KylliGroup"
        },
        {
            id: "3",
            name: "John",
            room: "KJen"
        }];
    });

    it("Should add new user", () => {
        var users = new Users();
        var user = {
            id: "1234",
            name: "Drews",
            room: "AnimeIsHere"
        };

        var resultUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    }); 

    it("Should remove a user", () => {
        var userResult = users.removeUser("1");
        expect(userResult.id).toBe("1");
    });

    it("Should not remove a user", () => {
        var userResult = users.removeUser("20");
        expect(userResult).toBe(undefined);
    });

    it("Should find a user", () => {
        var userResult = users.getUser("1");
        expect(userResult.name).toEqual(users.users[0].name);
    });

    it("Should not find a user", () => {
        var userResult = users.getUser("5");
        expect(userResult).toBe(undefined);
    });

    it("Should return names for KJen rooms", () => {
        var userResult = users.getUserList("KJen");
        expect(userResult).toEqual([users.users[0].name, users.users[2].name]);
    });

    it("Should return names for KylliGroup rooms", () => {
        var userResult = users.getUserList("KylliGroup");
        expect(userResult).toEqual([users.users[1].name]);
    });
});