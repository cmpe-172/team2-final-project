import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import UserDashboard from "./containers/UserDashboard";

import AppliedRoute from "./components/AppliedRoute";
import EmployeeSearch from "./containers/EmployeeSearch";
import EmployeeDetail from "./containers/EmployeeDetail";
import LoginOther from "./containers/LoginOther";
import Callback from "./containers/Callback";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/dashboard" exact component={UserDashboard} props={childProps} />
        <AppliedRoute path="/employees" exact component={EmployeeSearch} props={childProps} />
        <AppliedRoute path="/employee" exact component={EmployeeDetail} props={childProps} />
        <AppliedRoute path="/loginAuth0" exact component={LoginOther} props={childProps} />
        <AppliedRoute path="/callback" exact component={Callback} props={childProps} />

            { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>;