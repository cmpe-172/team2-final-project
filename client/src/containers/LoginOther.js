import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./LoginOther.css";

// import { Auth } from "aws-amplify";

import Auth0 from './Auth0';

export default class LoginOther extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            auth0: null
        };
    }




    async componentDidMount() {

    }


    // // Auth0: handle authentication:
    // handleAuthentication() {
    //     this.state.auth0.parseHash((err, authResult) => {
    //         if (authResult && authResult.accessToken && authResult.idToken) {
    //
    //             alert('SUCCESS: LoginOther:handleAuthentication: ' + authResult);
    //
    //             this.setSession(authResult);
    //             // Redirect to User's Dashboard after user successfully logs in:
    //             // TODO: this.props.history.push("/dashboard");
    //         } else if (err) {
    //             // Redirect to Login page if fails to login:
    //             alert('ERROR: LoginOther:handleAuthentication: ' + err);
    //             // TODO: this.props.history.push("/login");
    //             console.log(err);
    //         }
    //     });
    // }

    // // Auth0: set session:
    // setSession(authResult) {
    //     // Set the time that the Access Token will expire at
    //     let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    //
    //     // TODO: set to this.state...???
    //     localStorage.setItem('access_token', authResult.accessToken);
    //     localStorage.setItem('id_token', authResult.idToken);
    //     localStorage.setItem('expires_at', expiresAt);
    //     // navigate to the home route
    //     // TODO // history.replace('/home');
    // }



    handleSubmit = async event => {
        event.preventDefault();

        // Signify that we are starting the login loading process...
        this.setState({ isLoading: true });

        try {

            // TODO:

            const auth0 = new Auth0();

            await this.setState({ auth0: auth0 });

            this.state.auth0.login(); // TODO...???

             // this.handleAuthentication();

            // auth0.handleAuthentication();


            alert('Auth0 authenticated: ' + auth0.isAuthenticated());
            // TODO alert('Auth0 authenticated: ' + this.isAuthenticated());

            // await Auth.signIn(this.state.username, this.state.password);
            //
            // // Set the user as Authenticated (for saving user's Login Session):
            // this.props.userHasAuthenticated(true); // alert("Logged in");
            //
            // // Try....
            // this.props.setCurrentUsername(this.state.username);
            //
            // // Redirect to User's Dashboard after user successfully logs in:
            // this.props.history.push("/dashboard");

        } catch (e) {
            alert('LoginOther:handleSubmit ERROR: ' + e.message);

            // Login failed, so signify that done with the login loading process.
            this.setState({ isLoading: false });
        }
    }


    render() {
        return (
            <div className="LoginOther">
                <form onSubmit={this.handleSubmit}>

                    <LoaderButton
                        block
                        bsSize="large"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="LoginOther"
                        loadingText="Logging in with Auth0…"
                    />

                </form>
            </div>
        );
    }


}