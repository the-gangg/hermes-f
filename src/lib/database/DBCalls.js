"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sudobackend_1 = require("./sudobackend");
var firebase = require("firebase");
var database = new sudobackend_1.Database();
function createMessage(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.getObject("conversations/" + message.key)];
                case 1:
                    //console.log(await database.getObject("conversations/" + conversationKey));
                    if ((_a.sent()) != null) {
                        database.add(message, "conversations/" + message.key + "/messages");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function createConversation(conversation) {
    var key = database.add(conversation, "conversations/");
    // console.log(conversation);
    for (var i = 0; i < conversation.users.length; i++) {
        console.log("hello" + key);
        console.log(conversation.users[i]);
        database.add(key, "users/" + conversation.users[i] + "/conversationKey");
    }
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (validatePassword(user.password)) {
                console.log('got in here');
                //const signedInUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)["catch"](function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error.message);
                    //TODO exit if there is an issue
                });
            }
            else {
                return [2 /*return*/, false];
            }
            database.add(user, "users");
            // const signedInUser = firebase.auth().currentUser;
            // console.log(signedInUser);
            // if (signedInUser) {
            //     // User is signed in.
            //     console.log("Am I in here????");
            //     database.add({ uid: signedInUser.uid, conversationKey: [] }, "users");
            // } else {
            //     // No user is signed in.
            // }
            return [2 /*return*/, true];
        });
    });
}
function login(objectAdding) {
    firebase.auth().signInWithEmailAndPassword(objectAdding.email, objectAdding.password)["catch"](function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}
function logOut() {
    firebase.auth().signOut().then(function () {
        console.log(true);
        // Sign-out successful.
    })["catch"](function (error) {
        console.log(false);
        // An error happened.
    });
}
var user = {
    username: "Michh",
    email: "billl@iastate.edu",
    password: "Helllooooo",
    conversationKey: ["hell"]
};
// createUser(user);
//console.log(logOut());
function validatePassword(pass) {
    if (pass.length > 5) {
        return true;
    }
    return false;
}
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var res, snapshot, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(email);
                    res = database.db.ref("users");
                    return [4 /*yield*/, res.orderByChild('email').equalTo(email).once("value")];
                case 1:
                    snapshot = _a.sent();
                    console.log(snapshot.val());
                    for (data in snapshot.val()) {
                        return [2 /*return*/, data];
                    }
                    console.log('This is not an iterable');
                    return [2 /*return*/, null];
            }
        });
    });
}
function inviteConversation(arr, conversation) {
    return __awaiter(this, void 0, void 0, function () {
        var i, c;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3 /*break*/, 4];
                    console.log(arr[i]);
                    return [4 /*yield*/, findUserByEmail(arr[i])];
                case 2:
                    c = _a.sent();
                    if (c != null) {
                        conversation.users.push(c);
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    createConversation(conversation);
                    return [2 /*return*/];
            }
        });
    });
}
var c = {
    users: [],
    message: ["hi"],
    name: "hi"
};
var a = ["millerl@iastate.edu"];
inviteConversation(a, c);
