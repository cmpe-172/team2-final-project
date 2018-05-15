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
                    <h3>User's Dashboard</h3>


                    { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_profile)?
                        <div className="user_info">

                            <div class="list-group">
                                <a class="list-group-item list-group-item-action flex-column align-items-start">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h2 class="mb-1">Hello, {this.state.user_profile.name}</h2>
                                    </div>
                                </a>

                                { (this.state.user_profile.email) ?
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">Email address: {this.state.user_profile.email}</h4>
                                        </div>
                                    </a>
                                    :
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">No email for this user.</h4>
                                        </div>
                                    </a>
                                }

                                { (this.state.user_profile.nickname) ?
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">Nickname: {this.state.user_profile.nickname}</h4>
                                        </div>
                                    </a>
                                    :
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">No nickname for this user.</h4>
                                        </div>
                                    </a>
                                }

                            </div>

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
