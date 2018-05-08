import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import Amplify from "aws-amplify";
import config from "./config"; // Holds the AWS Cognito config info.


// Amplify refers to Cognito as Auth, S3 as Storage, and API Gateway as API:
Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        // NOT USING: identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
    // ,
    // Storage: {
    //     region: config.s3.REGION,
    //     bucket: config.s3.BUCKET,
    //     identityPoolId: config.cognito.IDENTITY_POOL_ID
    // },
    // API: {
    //     endpoints: [
    //         {
    //             name: "notes",
    //             endpoint: config.apiGateway.URL,
    //             region: config.apiGateway.REGION
    //         },
    //     ]
    // }
});


ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);


//ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
