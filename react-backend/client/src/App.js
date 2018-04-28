import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";

import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";

import { Auth } from "aws-amplify";




class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            username: null
        };
    }


    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
            }
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }


    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    setCurrentUsername = usernameFromLogin => {
        this.setState({ username: usernameFromLogin });
    }

    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);

        // Redirect to Login Page after user logs out:
        this.props.history.push("/login");
    }



    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            setCurrentUsername: this.setCurrentUsername,
            username: this.state.username
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
                                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                                : <Fragment>
                                    {/*<LinkContainer to="/signup">*/}
                                        {/*<NavItem>Signup</NavItem>*/}
                                    {/*</LinkContainer>*/}
                                    <LinkContainer to="/login">
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