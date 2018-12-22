export default class Login {
    constructor() {

    }

    checkLogin(userName: string, password: string): string {
        console.log('UserName: ', userName);
        console.log('password: ', password);
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
}