import React, { Component } from "react";
import "./UserDashboard.css";
// import {Auth} from "aws-amplify/lib/index";

//import Employee from "../models/employee.js";

// import Database from "../models/index.js";


export default class UserDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user_employee: null
        };
    }




    async componentDidMount() {

        // this.callHelloApi()
        //     .then(res => {
        //         alert("success in callHelloApi");
        //         //console.log(res);
        //         //alert(res);
        //
        //         alert('status = ' + res.status);
        //         alert('response = ' + res.express); // access vaiables in the JSON response.
        //         // this.setState({
        //         //     json: res.map(x => x),
        //         // })
        //     })
        //     .catch(err => {
        //         alert("error in callHelloApi");
        //         console.log(err);
        //         alert(err);
        //     });


        this.getEmployee('10004')
            .then(res => {
                // alert("success in callGetEmployeeApi");

                //console.log(res);
                //alert(res);

                // alert('status: ' + res.status);

                // alert('res.employee = ' + res.employee);
                // alert('res.employee.emp_no = ' + res.employee.emp_no); // access variables in the JSON response.
                // alert('res.employee.first_name = ' + res.employee.first_name);

                // Set this in the state so can use in view (in 'render' function):
                this.setState({
                    user_employee: res.employee
                });
            })
            .catch(err => {
                alert("error in callGetEmployeeApi");
                console.log(err);
                alert(err);
            });

        this.setState({ isAuthenticating: false });
    }


    getEmployee = async (emp_no) => {
        //const response = await fetch('test1');

        //var emp_no = '10002';

        const response = await fetch('employee/'+emp_no);
        const body = await response.json();//body; //json();//.json();


        //alert(body);
        //alert(response.body);
        //console.log(response.toString());
        //alert(response.status);

        if (response.status !== 200) throw Error(body.message);
        return body;
    };



    // This is a test method to show that can call GET API from app.js file:
    callHelloApi = async () => {
        const response = await fetch('/api/hello');//fetch('/fetchdata');
        const body = await response.json();//body; //json();//.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };






    render() {
        return (
            <div className="UserDashboard">
                <div className="lander">
                    <h1>User's Dashboard</h1>

                    {(this.state.user_employee != null)?
                        <div className="employee_info">
                            <h2>Hello, {this.state.user_employee.first_name} {this.state.user_employee.last_name}</h2>
                            <p>Employee : {this.state.user_employee.emp_no}</p>
                            <p>Hire Date : {this.state.user_employee.hire_date}</p>
                        </div>

                        :
                        <p>Loading Employee Data...</p>
                    }

                </div>
            </div>
        );
    }
}
