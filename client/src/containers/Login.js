import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

import { Auth } from "aws-amplify";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        // Signify that we are starting the login loading process...
        this.setState({ isLoading: true });

        try {
            await Auth.signIn(this.state.username, this.state.password);

            // Set the user as Authenticated (for saving user's Login Session):
            this.props.userHasAuthenticated(true); // alert("Logged in");

            // Try....
            this.props.setCurrentUsername(this.state.username);

            // Redirect to User's Dashboard after user successfully logs in:
            this.props.history.push("/dashboard");

        } catch (e) {
            alert(e.message);

            // Login failed, so signify that done with the login loading process.
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>

                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />

                </form>
            </div>
        );
    }
}