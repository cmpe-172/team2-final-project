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
            user_employee: null,
            user_department: null
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


        var emp_no = '10004';

        this.getEmployee(emp_no)
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
                alert("error in getEmployee");
                console.log(err);
                alert(err);
            });




        // this.getDepartment('d007')
        //     .then(res => {
        //         // alert("success in callGetEmployeeApi");
        //
        //         //console.log(res);
        //         //alert(res);
        //
        //         // alert('status: ' + res.status);
        //
        //         alert('res.department = ' + res.department);
        //         alert('res.department.dept_no = ' + res.department.dept_no); // access variables in the JSON response.
        //         alert('res.department.dept_name = ' + res.department.dept_name);
        //
        //         // Set this in the state so can use in view (in 'render' function):
        //         // TODO:
        //         // this.setState({
        //         //     user_employee: res.employee
        //         // });
        //     })
        //     .catch(err => {
        //         alert("error in getDepartment");
        //         console.log(err);
        //         alert(err);
        //     });


        this.getEmployeeDepartment(emp_no)
            .then(res => {
                // alert("success in callGetEmployeeApi");

                //console.log(res);
                //alert(res);

                // alert('status: ' + res.status);

                // alert('res.employee_department = ' + res.employee_department);
                // alert('res.employee_department.dept_no = ' + res.employee_department.dept_no); // access variables in the JSON response.
                // alert('res.employee_department.dept_name = ' + res.employee_department.dept_name);
                // alert('res.employee_department.emp_no = ' + res.employee_department.emp_no);

                // Set this in the state so can use in view (in 'render' function):
                this.setState({
                    user_department: res.employee_department
                });
            })
            .catch(err => {
                alert("error in getDepartment");
                console.log(err);
                alert(err);
            });



        this.setState({ isAuthenticating: false });
    }


    getEmployee = async (emp_no) => {
        const response = await fetch('employee/' + emp_no); // Call API declared in app.js file.
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };


    getDepartment = async (dept_no) => {
        const response = await fetch('department/' + dept_no); // Call API declared in app.js file.
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getEmployeeDepartment = async (emp_no) => {
        const response = await fetch('employee-department/' + emp_no); // Call API declared in app.js file.
        const body = await response.json();

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


                    { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_employee != null)?
                        <div className="employee_info">
                            <h2>Hello, {this.state.user_employee.first_name} {this.state.user_employee.last_name}</h2>
                            <p>Employee # : {this.state.user_employee.emp_no}</p>
                            <p>Hire Date : {this.state.user_employee.hire_date}</p>
                        </div>

                        : // if is null:
                        <p>Loading Employee Data...</p>
                    }

                    { // Show User's department info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_department != null)?
                            <div className="employee_info">
                                <h3>Department: {this.state.user_department.dept_name}</h3>
                                <p>Department # : {this.state.user_department.dept_no}</p>
                                <p>In Department since : {this.state.user_employee.from_date}</p>
                            </div>

                            : // if is null:
                            <p>Loading Employee Department Data...</p>
                    }

                </div>
            </div>
        );
    }
}
