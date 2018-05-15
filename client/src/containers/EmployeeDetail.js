import React, { Component } from "react";
import "./UserDashboard.css";
// import {Auth} from "aws-amplify/lib/index";

//import Employee from "../models/employee.js";

// import Database from "../models/index.js";


export default class EmployeeDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user_emp_no: null,
            user_employee: null,
            user_department: null,
            user_salary: null,
            user_title_info: null
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


        // DEBUG ONLY:
        // alert('this.props.username = ' + this.props.username);


        var emp_no = this.props.selectedEmployee; // "10005"; // TODO: get Selected Employee...
        // NOTE: setState is async, so must use 'await' or .then:
        await this.setState({
            user_emp_no: emp_no
        });

        if (this.state.user_emp_no != null) {

            // Load employee info into state:
            this.getEmployee(this.state.user_emp_no)
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
                .catch(error => {
                    alert("error in getEmployee");
                    console.log(error);
                    alert(error);
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


            // Load employee department info into state:
            this.getEmployeeDepartment(this.state.user_emp_no)
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

            // Load employee salary info into state:
            this.getEmployeeSalary(this.state.user_emp_no)
                .then(res => {
                    // alert("success in callGetEmployeeApi");

                    //console.log(res);
                    //alert(res);

                    // alert('status: ' + res.status);

                    // alert('res.employee_salary = ' + res.employee_salary);
                    // alert('res.employee_salary.salary = ' + res.employee_salary.salary); // access variables in the JSON response.

                    // Set this in the state so can use in view (in 'render' function):
                    this.setState({
                        user_salary: res.employee_salary
                    });
                })
                .catch(err => {
                    alert("error in getDepartment");
                    console.log(err);
                    alert(err);
                });


            // Load employee title info into state:
            this.getEmployeeTitle(this.state.user_emp_no)
                .then(res => {
                    this.setState({
                        user_title_info: res.employee_title
                    });
                })
                .catch(err => {
                    alert("error in getDepartment");
                    console.log(err);
                    alert(err);
                });


            // end employee info loading.
        }
        else {
            alert("ERROR: Employee Number sent was null.");
        }

        // Finished authenticating user:
        this.setState({isAuthenticating: false});

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


    getEmployeeSalary = async (emp_no) => {
        const response = await fetch('employee-salary/' + emp_no); // Call API declared in app.js file.
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };


    getEmployeeTitle = async (emp_no) => {
        const response = await fetch('employee-title/' + emp_no); // Call API declared in app.js file.
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



/*
    { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_employee != null)?
                            <div className="employee_info">
                                <h2>{this.state.user_employee.first_name} {this.state.user_employee.last_name}</h2>
                                <p>Employee # : {this.state.user_employee.emp_no}</p>
                                <p>Hire Date : {this.state.user_employee.hire_date}</p>
                            </div>

                            : // if is null:
                            <p>Loading Employee Data...</p>
                    }

                    { // Show User's title info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_title_info != null)?
                            <div className="employee_info">
                                <h3>{this.state.user_title_info.title}</h3>
                                <p>since: {this.state.user_title_info.from_date}</p>
                            </div>

                            : // if is null:
                            <p>Loading Employee Title Data...</p>
                    }

                    { // Show User's department info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_department != null)?
                            <div className="employee_info">
                                <h3>Department: {this.state.user_department.dept_name}</h3>
                                <p>Department # : {this.state.user_department.dept_no}</p>
                                <p>In Department since : {this.state.user_department.from_date}</p>
                            </div>

                            : // if is null:
                            <p>Loading Employee Department Data...</p>
                    }
 */



    getDateString = (date) => {
        var dateString = new String(date);
        dateString = dateString.split("T");

        return dateString[0];
    }

    render() {
        return (
            <div className="EmployeeDetail">
                <div className="lander">
                    <h3>Employee Information</h3>

                    { // Show User's salary info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.user_employee != null
                            && this.state.user_title_info != null
                            && this.state.user_department != null
                            && this.state.user_salary != null)?
                            <div className="employee_info">

                                <div class="list-group">
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 class="text-muted">Employee Name:</h7>
                                            <h3 class="mb-1">{this.state.user_employee.first_name} {this.state.user_employee.last_name}</h3>
                                            <h7 class="text-muted">Employee Number:</h7>
                                            <h4 class="text-muted">{this.state.user_employee.emp_no}</h4>
                                            <h5 class="text-muted">Hire Date: {this.getDateString(this.state.user_employee.hire_date)} </h5>
                                        </div>
                                    </a>
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 class="mb-1">Department:</h7>
                                            <h4 class="mb-1">{this.state.user_department.dept_name}</h4>
                                            <h7 class="text-muted">Department Number:</h7>
                                            <h4 class="text-muted">{this.state.user_department.dept_no}</h4>
                                            <h5 class="text-muted">In Department since : {this.getDateString(this.state.user_department.from_date)}</h5>
                                        </div>
                                    </a>
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 class="mb-1">Title:</h7>
                                            <h4 class="mb-1">{this.state.user_title_info.title}</h4>
                                            <h5 class="text-muted">since {this.getDateString(this.state.user_title_info.from_date)}</h5>
                                        </div>
                                    </a>
                                    <a class="list-group-item list-group-item-action flex-column align-items-start">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 class="mb-1">Current salary:</h7>
                                            <h4 class="mb-1">${this.state.user_salary.salary}</h4>
                                        </div>
                                    </a>
                                </div>

                            </div>

                            : // if is null:
                            <p>Loading Employee Salary Data...</p>
                    }



                </div>
            </div>
        );
    }
}
