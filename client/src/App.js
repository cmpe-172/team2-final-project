import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";

import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";

import { Auth } from "aws-amplify";

import Auth0 from './containers/Auth0';





class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            username: null,
            selectedEmployee: null
        };
    }


    async componentDidMount() {
        try {
            // Check if logged in through AWS Cognito user pool:
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
            }
            else { // Check if logged in through Auth0:
                const auth0 = new Auth0();
                if (auth0.isAuthenticated()) {
                    this.userHasAuthenticated(true);
                }
            }
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    // NOTE: exported (below) in render.childProps:
    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    // NOTE: exported (below) in render.childProps:
    setCurrentUsername = usernameFromLogin => {
        this.setState({ username: usernameFromLogin });
    }

    // NOTE: exported (below) in render.childProps:
    setSelectedEmployee = emp_no => {
        this.setState({ selectedEmployee: emp_no });
    }

    handleLogout = async event => {

        // Logout of AWS Cognito:
        await Auth.signOut();

        // Set user as logged out in state:
        this.userHasAuthenticated(false);

        // Logout of Auth0 session:
        const auth0 = new Auth0();
        if (auth0.isAuthenticated()) {
            auth0.logout();
        }

        // Redirect to Home Page after user logs out:
        this.props.history.push("/");
    }


    // testAuth0Login = async event => {
    //
    //     const auth0 = new Auth0();
    //     auth0.login();
    // }



    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            setCurrentUsername: this.setCurrentUsername,
            username: this.state.username,
            setSelectedEmployee: this.setSelectedEmployee,
            selectedEmployee: this.state.selectedEmployee
        };

        return (
            !this.state.isAuthenticating &&
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Team2</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>

                            { /* Only show Login/Signup if user is not already logged in: */ }
                            {this.state.isAuthenticated
                                ? <Fragment>

                                    <LinkContainer to="/employees">
                                        <NavItem>Employees</NavItem>
                                    </LinkContainer>

                                    <LinkContainer to="/dashboard">
                                        <NavItem>Dashboard</NavItem>
                                    </LinkContainer>

                                    <NavItem onClick={this.handleLogout}>Logout</NavItem>

                                </Fragment>
                                : <Fragment>
                                    {/*<LinkContainer to="/signup">*/}
                                        {/*<NavItem>Signup</NavItem>*/}
                                    {/*</LinkContainer>*/}
                                    <LinkContainer to="/loginAuth0">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>

                                </Fragment>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Routes childProps={childProps} />
            </div>
        );
    }



}

export default withRouter(App);