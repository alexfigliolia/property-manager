import React, { Component } from 'react';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginClasses: 'login',
      height: window.innerHeight,
      loggedIn: true, 
      loginClasses: 'login',
      properties: [],
      rentPayments: [],
      issues: [],
      unread: []
    }
    this.loader = document.getElementById('appLoader');
  }

  componentDidMount = () => {
    window.addEventListener('resize', () => {
      this.setState({ height: window.innerHeight });
    });
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    if(nextProps.user === null || nextProps.id === null) {
      this.setState({ 
        loggedIn: false,
        loginClasses: 'login login-visible'
      });
    } else {
      const accExists = nextProps.groupAccount.length > 0;
      this.setState({ 
        loggedIn: true, 
        loginClasses: 'login login-visible logged-in',
        properties: nextProps.properties,
        rentPayments: nextProps.payments,
        issues: nextProps.issues,
        unread: nextProps.user.unread
      });
    }
    if(this.loader) {
      this.loader.classList.add('app-loader-hidden');
      setTimeout(() => { this.loader.remove() }, 300);
    }
  }

  render = () => {
    return (
      <div className="App">

        <Login 
          classes={this.state.loginClasses} />

        {
          this.state.loggedIn &&
          <Dashboard 
            height={this.state.height}
            properties={this.state.properties}
            issues={this.state.issues}
            payments={this.state.rentPayments}
            messages={this.props.messages}
            conversations={this.props.conversations}
            unread={this.state.unread} />
        }

      </div>
    );
  }
}