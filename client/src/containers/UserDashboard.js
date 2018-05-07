import React, { Component } from "react";
import "./UserDashboard.css";
// import {Auth} from "aws-amplify/lib/index";

//import Employee from "../models/employee.js";

// import Database from "../models/index.js";

import Auth0 from './Auth0';

export default class UserDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user_profile: null
        };
    }




    async componentDidMount() {

        const auth0 = new Auth0();

        var accessToken = auth0.getAccessToken();

        var dashboard = this;

        if (accessToken) {
            auth0.auth0.client.userInfo(accessToken, function(err, profile) {
                if (profile) {

                    // alert('Found user profile: ' + profile);
                    // alert('user nickname: ' + profile.nickname);
                    // alert('user name: ' + profile.name);

                    dashboard.setState({
                        user_profile: profile
                    });

                    //userProfile = profile;
                    //displayProfile();
                }
            });
        }
        else {
            alert('No Auth0 access token for current user.');
        }


        // Finished authenticating user:
        this.setState({isAuthenticating: false});
    }



    render() {
        return (
            <div className="UserDashboard">
                <div className="lander">
                    <h1>User's Dashboard</h1>


                    { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_profile)?
                        <div className="user_info">
                            { (this.state.user_profile.name) ?
                                <h2>Hello, {this.state.user_profile.name}</h2>
                                :
                                <h2>Hello</h2>
                            }

                            { (this.state.user_profile.email) ?
                                <h4>Email address: {this.state.user_profile.email}</h4>
                                :
                                <h4>No email for this user.</h4>
                            }

                            { (this.state.user_profile.nickname) ?
                                <h4>Nickname: {this.state.user_profile.nickname}</h4>
                                :
                                <h4>No nickname for this user.</h4>
                            }
                            <p>Choose Employees to search.</p>
                        </div>

                        : // if is null:
                        <p>Loading User Data...</p>
                    }



                </div>
            </div>
        );
    }
}
