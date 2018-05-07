import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

export default class EmployeeSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingResults: false,
            employeeSearchField: "",
            employees: null
        };
    }

    validateForm() {
        return this.state.employeeSearchField.length > 0;// && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        // TODO

        // Signify that we are starting the login loading process...
        this.setState({ isLoadingResults: true });


        // searches emp_no, first_name, last_name (using SQL LIKE to get any row that matches).
        this.getEmployees(this.state.employeeSearchField)
            .then(res => {

                if (res.sql_error) {
                    alert(res.sql_error);
                    console.log("SQL error: " + res.sql_error);

                    // Search failed, so signify that done with the search loading process.
                    this.setState({ isLoadingResults: false });
                }
                else { // Search results found:
                    // Set this in the state so can use in view (in 'render' function):
                    this.setState({
                        employees: res.employees
                    });

                    // Search complete, so signify that done with the search loading process.
                    this.setState({ isLoadingResults: false });
                }

            })
            .catch(error => {
                alert("error in getEmployees");
                console.log(error);
                alert(error);

                // Search failed, so signify that done with the search loading process.
                this.setState({ isLoadingResults: false });
            });



    }

    getEmployees = async (emp_no) => {
        const response = await fetch('employees/' + emp_no); // Call API declared in app.js file.
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <div className="EmployeeSearch">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="employeeSearchField" bsSize="large">
                        <ControlLabel>Enter Employee first name, last name, or employee number to Search.</ControlLabel>
                        <FormControl
                            autoFocus
                            type="employeeSearchField"
                            value={this.state.employeeSearchField}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoadingResults}
                        text="Search"
                        loadingText="Searching..."
                    />

                </form>

                {/*{ // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):*/}
                    {/*(this.state.employees != null && this.state.employees[0] != null)?*/}
                        {/*<div className="employee_info">*/}
                            {/*<h2>Hello, {this.state.employees[0].first_name} {this.state.employees[0].last_name}</h2>*/}
                            {/*<p>Employee # : {this.state.employees[0].emp_no}</p>*/}
                            {/*<p>Hire Date : {this.state.employees[0].hire_date}</p>*/}
                        {/*</div>*/}

                        {/*: // if is null:*/}
                        {/*<p>Enter Employee ID to Search.</p>*/}
                {/*}*/}

                <div className="EmployeeSearch">
                    { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.employees != null)?
                            <BootstrapTable data={ this.state.employees } striped hover condensed>
                                <TableHeaderColumn dataField='emp_no' isKey>Employee No.</TableHeaderColumn>
                                <TableHeaderColumn dataField='first_name'>First Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='last_name'>Last Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='dept_name'>Department</TableHeaderColumn>
                            </BootstrapTable>

                            : // if is null:
                            <p></p>
                    }
                </div>



            </div>
        );
    }
}