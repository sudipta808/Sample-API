"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    constructor() {
    }
    checkLogin(userName, password) {
        console.log('UserName: ', userName);
        console.log('password: ', password);
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
}
exports.default = Login;
