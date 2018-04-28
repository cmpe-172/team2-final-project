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
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
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
            await Auth.signIn(this.state.email, this.state.password);

            // Set the user as Authenticated (for saving user's Login Session):
            this.props.userHasAuthenticated(true); // alert("Logged in");

            // TODO: Get the user from the DB:
            // ....use this.state.email or this.state.password to do MySQL search.
            // ....use emp_no field to look up in DB.
            try {

                // NOTE: CANNOT DO MySQL call in client!!
                // instead use a GET request...
                // MySQLConnection.connect(function(err) {
                //     if (err) throw err;
                //     var emp_no = 10001;
                //     var sql = 'SELECT * FROM employees WHERE emp_no = ?';
                //     MySQLConnection.query(sql, [emp_no], function (err, result) {
                //         if (err) throw err;
                //         console.log(result);
                //     });
                // });

                // search for known ids
                // 10001,Georgi,Facello,Georgi.Facello@team2-app172.com
                //Employee.findById(10001).then(employee => {

                // db.employee.findById(10001).then(employee => {
                //     // employee will be an instance of Employee and stores the content of the table entry
                //     // with id 123. if such an entry is not defined you will get null
                //     console.log(employee);
                //     // TODO: add employee to the state...
                // })
            }
            catch(e) {
                alert(e);
            }


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
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
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