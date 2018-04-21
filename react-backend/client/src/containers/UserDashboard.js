import React, { Component } from "react";
import "./UserDashboard.css";
import {Auth} from "aws-amplify/lib/index";

//import Employee from "../models/employee.js";

// import db from "../models/index.js";

export default class UserDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            userFirstName: ""
        };
    }


    async componentDidMount() {

        // db.sequelize
        //     .authenticate()
        //     .then(() => {
        //         console.log('Connection has been established successfully.');
        //     })
        //     .catch(err => {
        //         console.error('Unable to connect to the database:', err);
        //     });

        try {
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
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }


    render() {
        return (
            <div className="UserDashboard">
                <div className="lander">
                    <h1>User's Dashboard</h1>
                    <p>TODO: get user from DB into state.</p>
                </div>
            </div>
        );
    }
}