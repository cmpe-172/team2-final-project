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

        // Redirect to Auth0's Universal Login page:

        const auth0 = new Auth0();

        auth0.login();
    }



    // handleSubmit = async event => {
    //     event.preventDefault();
    //
    //     // Signify that we are starting the login loading process...
    //     this.setState({ isLoading: true });
    //
    //     try {
    //         const auth0 = new Auth0();
    //
    //         await this.setState({ auth0: auth0 });
    //
    //         auth0.login();
    //
    //     } catch (e) {
    //         alert('LoginOther:handleSubmit ERROR: ' + e.message);
    //
    //         // Login failed, so signify that done with the login loading process.
    //         this.setState({ isLoading: false });
    //     }
    // }


    render() {
        return (
            <div className="LoginOther">

            </div>
        );
    }


}