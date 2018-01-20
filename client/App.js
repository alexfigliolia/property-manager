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
      unread: [],
      toastClasses: 'toast',
      toastTitle: '',
      toastMessage: ''
    }
    this.loader = document.getElementById('appLoader');
    this.text = new Audio("iphone_notification.mp3");
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
      if(this.props.user && 
        this.props.user.unread && nextProps.user.unread && 
        nextProps.user.unread.length > this.props.user.unread.length) 
      {
        const lastMessage = nextProps.messages[nextProps.messages.length - 1];
        this.text.play();
        this.haveAToast(`New message from ${lastMessage.from.name}`, lastMessage.text);
      }
    }
    if(this.loader) {
      this.loader.classList.add('app-loader-hidden');
      setTimeout(() => { this.loader.remove() }, 300);
    }
  }

  haveAToast = (title, message) => {
    this.setState({toastTitle: title, toastMessage: message, toastClasses: 'toast toast-show'}, () => {
      setTimeout(this.dimssToast, 4000);
    });
  }

  dismissToast = () => this.setState({ toastClasses: 'toast' });

  render = () => {
    return (
      <div className="App" style={{height: this.state.height}}>

        <Login 
          classes={this.state.loginClasses}
          height={this.props.height} />

        {
          this.state.loggedIn &&
          <Dashboard 
            height={this.state.height}
            properties={this.state.properties}
            issues={this.state.issues}
            payments={this.state.rentPayments}
            messages={this.props.messages}
            conversations={this.props.conversations}
            unread={this.state.unread}
            classes={this.state.toastClasses}
            title={this.state.toastTitle}
            message={this.state.toastMessage}
            haveAToast={this.haveAToast}
            dismissToast={this.dismissToast} />
        }

      </div>
    );
  }
}