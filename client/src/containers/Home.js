import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                <div className="lander">
                    {
                        // If is logged in:
                        (this.props.isAuthenticated) ?
                            <div>
                                <h1>Team2 Employee Lookup</h1>
                                <p>Choose Employees to Search</p>
                            </div>
                            : // if not logged in:
                            <div>
                                <h1>Welcome to Team2 Employee Lookup</h1>
                                <p>Login with your credentials to search</p>
                            </div>
                    }

                </div>
            </div>
        );
    }
}