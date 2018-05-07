// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth0 {
    auth0 = new auth0.WebAuth({
        domain: 'app-172.auth0.com',
        clientID: '9EMUrseARUcu3BFMd42y3rk9YQN3BM8R', // 'cEeDE83Z5l48PRGxc5BQGgdmbXO9YOLi',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://app-172.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile email' // scope: 'openid'
    });

    // constructor() {
    //     this.login = this.login.bind(this);
    //     this.logout = this.logout.bind(this);
    //     this.handleAuthentication = this.handleAuthentication.bind(this);
    //     this.isAuthenticated = this.isAuthenticated.bind(this);
    // }

    login() {
        this.auth0.authorize();
    }


    // Auth0: handle authentication:
    async handleAuthentication(onCompleCallback) {

        //alert('in Auth0.handleAuthentication()...');


        //this.auth0.parseHash((err, authResult) => {
        await this.auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {

                //alert('SUCCESS: LoginOther:handleAuthentication: ' + authResult);

                this.setSession(authResult, onCompleCallback);
                // Redirect to User's Dashboard after user successfully logs in:
                // TODO: this.props.history.push("/dashboard");
            } else if (err) {
                // Redirect to Login page if fails to login:
                alert('ERROR: LoginOther:handleAuthentication: ' + err);
                // TODO: this.props.history.push("/login");
                console.log(err);
            }

            //alert('err = ' + err);
        });
    }

    // Auth0: set session:
    setSession(authResult, onCompleCallback) {
        //alert('in Auth0.setSession(...)...');
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // TODO: set to this.state...???

        // alert('in auth0.setSession: accessToken=[' + authResult.accessToken + ']; idToken=[' + authResult.idToken + ']; expiresAt=[' + expiresAt + ']');

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        // TODO // history.replace('/home');
        onCompleCallback(); // When done, perform some action specified by the caller.
    }


    getAccessToken() {
        return localStorage.getItem('access_token');
    }


    // Auth0: check is authenticated:
    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));

        //alert('in auth0.isAuthenticated: expiresAt = ' + expiresAt);

        //let currTime = new Date().getTime();
        //alert(' AND (Date().getTime() < expiresAt) returns(T=auth):' + (currTime < expiresAt));

        return (new Date().getTime() < expiresAt);
    }



    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        // history.replace('/home');
    }
}