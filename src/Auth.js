class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
        sessionStorage.removeItem("jwtAccessToken");
        sessionStorage.removeItem("user");
    }

    isAuthenticated() {
        if(sessionStorage.getItem("jwtAccessToken") === null || sessionStorage.getItem("user") === null){
            return false;
        }
        return true;
    }
}

export default new Auth()