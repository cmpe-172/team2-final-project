import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json()) // in order to get this express needs to running too. 
      .then(users => this.setState({users})); // add user list to state object.
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <h1> Users: </h1>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}> {user.username} </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
