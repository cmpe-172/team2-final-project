import React, { Component } from 'react';
import loading from './loading.svg';

import Auth0 from './Auth0';

class Callback extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }





    async componentDidMount() {

        const auth0 = new Auth0();

        //alert('Reached componentDidMount of Callback. About to do: auth0.handleAuthentication()...');

        auth0.handleAuthentication(() => {
            // because we are using an "arrow function" the 'this' will mean Callback and not the inner function's 'this'.
            if (auth0.isAuthenticated()) {
                this.state.isLoading = false;
                //alert('setting isLoading to false.');

                // Set the user as Authenticated (for saving user's Login Session):
                this.props.userHasAuthenticated(true); // alert("Logged in");

                // Redirect to Dashboard after user logs in with Auth0:
                this.props.history.push("/dashboard");
            }
        })

    }


        render() {
        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            // backgroundColor: 'white',
        }

        return (


            <div>
                { // Show User's employee info if not null: (using ternary operator: (bool)? TRUE : FALSE ):
                    (this.state.isLoading)?
                        // Show loading spinner:
                        <div style={style}>
                            <img src={loading} alt="loading"/>
                            <p>Authenticating...</p>
                        </div>

                        : // if done loading:
                        <p>Successfully Signed in!</p>
                }
            </div>


        );
    }
}

export default Callback;