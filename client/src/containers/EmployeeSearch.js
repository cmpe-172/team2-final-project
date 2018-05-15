import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import LoaderButton from "../components/LoaderButton";
import "./Login.css";


import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";

export default class EmployeeSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingResults: false,
            employeeSearchField: "",
            employees: null,
            selected_emp_no: null
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


    handleCellClick = (emp_no) => {
        this.setState({
            selected_emp_no: emp_no
        });

        // Set the selected employee's ID:
        this.props.setSelectedEmployee(emp_no);

        // Redirect to Employee Detail page (for selected employee):
        this.props.history.push("/employee");
    }

    // doCellTest = (cell) => {
    //
    //
    //
    //     return (
    //         //
    //         //<NavItem onClick={this.handleCellClick(10002)}> { cell } </NavItem>//alert("The cell selected is: " + cell);
    //
    //         <LinkContainer to="/employee">
    //             <NavItem> {cell} </NavItem>
    //         </LinkContainer>
    //
    //     );
    //
    //     /*
    //     <LinkContainer to="/">
    //         <NavItem> {cell} </NavItem>
    //     </LinkContainer>
    //     */
    // }

    // options = {
    //
    //     state : state,
    //
    //     onRowClick: function(row) {
    //         alert("selected row: " + row.emp_no);
    //
    //         alert("state = " + this.state);
    //         //EmployeeSearch.handleCellClick(10002);
    //     }
    // }

    // Called automatically by BootstrapTable because 'options={this}' set:
    // Will be called whenever a row is selected:
    onRowClick = (row) => {
        // alert("selected row: " + row.emp_no);
        this.handleCellClick(row.emp_no);
    }



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

                <br></br>

                <div>
                    { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                        (this.state.employees != null)?
                            <BootstrapTable data={ this.state.employees } options={this} striped hover condensed>
                                <TableHeaderColumn dataField='emp_no' dataSort={true} isKey>Employee No.</TableHeaderColumn>
                                <TableHeaderColumn dataField='first_name' dataSort={true} >First Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='last_name' dataSort={true} >Last Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='dept_name' dataSort={true} >Department</TableHeaderColumn>
                            </BootstrapTable>

                            : // if is null:
                            <p></p>
                    }
                </div>



            </div>
        );
    }
}
