import { getUserApi } from './api'

class Auth {
    constructor () {
        this.authenticated = false;
    }

    login() {

    }

    async isAuthenticated() {
        const user = await getUserApi();
        console.log("isAuth");
        console.log(user);
    }
}

export default new Auth();