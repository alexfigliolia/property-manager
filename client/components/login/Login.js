import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { validateEmail, validatePassword, validateName } from '../../../helpers/helpers';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: false,
			loginErrors: "",
			height: window.innerHeight,
			buttonClasses: "",
			lastStep: false,
			email: '',
			password: '',
			name: '',
			groupName: '',
			groupPassword: '',
			groupAccount: false
		}
	}

	newUser = () => {
		if(!this.state.newUser) {
			this.setState({ newUser: true, loginErrors: "" });
		} else {
			this.setState({ newUser: false, loginErrors: "", name: '' });
		}
	}

	validateLogin = (e) => {
		this.setState({buttonClasses: 'button-loading'});
		if(this.state.lastStep) {
			this.groupName = this.handleGroupName();
			this.groupPassword = this.state.groupPassword;
			Meteor.call('groupAccount.find', this.groupName, this.groupPassword, this.state.name, (err, res) => {
				if(err || !res) {
					this.setState({buttonClasses: '', loginErrors: 'Group account not found'});
				} else {
					if(res[0] !== undefined) {
						this.setState({groupAccount: res[0]});
						this.signUp(res[0]._id);
					} else {
						this.setState({buttonClasses: '', loginErrors: 'Group account not found'});
					}
				}
			});
			return; 
		} else {
			const email = this.handleEmail();
			const password = this.handlePassword();
			if(!this.state.newUser) {
				if(email && password) this.login(email, password);
			} else {
				const name = this.handleName();
				if(email && password && name) {
					this.setState({ lastStep: true, buttonClasses: '', loginErrors: '' });
				}
			}
		}
	}

	handleEmail = () => {
		if (validateEmail(this.state.email)) {
			return this.state.email;
		} else {
			this.setState({buttonClasses: '', email: '', loginErrors: 'Email must be valid'});
			return false;
		}
	}

	handlePassword = () => {
		if(validatePassword(this.state.password)) {
			return this.state.password;
		} else {
			this.setState({buttonClasses: '', password: '', loginErrors: 'Password must be more than 3 characters'});
			return false;
		}
	}

	handleName = () => {
		if(validateName(this.state.name)){
			return this.state.name;
		} else {
			this.setState({name: '', loginErrors: 'Your full name is required', buttonClasses: ''});
			return false;
		}
	}

	handleGroupName = () => {
		if(validateName(this.state.groupName)) {
			return this.state.groupName;
		} else {
			this.setState({groupName: '', buttonClasses: '', loginErrors: "Group Name is the property owner's full name"})
			return false;
		}
	}

	login = (e, p) => {
    const email = e.toLowerCase();
    Meteor.call('users.checkIfOwner', email, (err, res) => {
    	if(err) {
    		console.log(err);
    		this.setState({ buttonClasses: '', loginErrors: 'This software is only for your managers!' });
    	} else {
    		if(res === true) {
    			this.setState({ buttonClasses: '', loginErrors: 'This software is only for your managers!' });
    		} else {
    			Meteor.loginWithPassword(email, p, (err) => {
			      if(err){
			        // console.log(err.reason);
			        this.setState({ buttonClasses: '', loginErrors: err.reason });
			      } else {
			        this.setState({
			          loginErrors: "", 
			          buttonClasses: 'button-loading good-to-go'
			        }, this.resetState);
			        document.body.scrollTop = 0;
			      }
			    });
    		}
    	}
    })
  }

  signUp = (groupId) => {
    if(this.state.groupAccount) {
    	Accounts.createUser(
	    	{
	    		name: this.state.name, 
	    		email: this.state.email.toLowerCase(),
	    		password: this.state.password, 
	    		groupId: groupId, 
	    		groupName: this.state.groupName,
	    		groupPassword: this.state.groupPassword
	    	}, (err) => {
	      if(err){
	        // console.log(err.reason);
	        this.setState({buttonClasses: '', loginErrors: err.reason});
	      } else {
	        // console.log('creating new user');
	        Meteor.loginWithPassword(this.state.email.toLowerCase(), this.state.password, (err) => {
	          if(err) {
	            // console.log(err.reason);
	            this.setState({ loginErrors: err.reason, buttonClasses: '' });
	          } else {
	            // console.log('logging in new user');
	            this.setState({ loginErrors: '', buttonClasses: 'button-loading good-to-go' });
	            Meteor.call('convos.mesh', this.state.groupAccount.owner, (err, res) => {
	              if(err) {
	              	console.log(err);
	              } else {
	              	document.body.scrollTop = 0;
	              	this.resetState();
	              }
	            });
	          }
	        });
	 			}
    	});
    } else {
    	this.setState({buttonClasses: '', loginErrors: 'There was a problem connecting you to your group account. Please try again.'});
    }
  }

  resetState = () => {
  	setTimeout(() => {
  		this.setState({
  			buttonClasses: '',
  			newUser: false,
  			lastStep: false,
  			email: "",
  			password: '',
  			name: '',
  			groupName: '',
  			groupPassword: '',
  			groupAccount: false
  		});
  	}, 1500)
  }

	render = () => {
		return (
			<div 
				className={this.props.classes} 
				id="login" 
				style={{height: this.state.height}}>
				<div>
					<h1>
						{
							'REACT'.split('').map((char, i) => <div key={i}>{char}</div>)
						}
					</h1>
					<div className='login-forms'>
						{
							this.state.loginErrors !== "" &&
							<h2>{this.state.loginErrors}</h2>
						}
						{
							this.state.newUser &&
							!this.state.lastStep &&
							<div className="input">
								<input
									onChange={(e) => this.setState({name: e.target.value})}
									value={this.state.name} 
									type="text" 
									placeholder="Full Name" />
								<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
							    <path className="stroke-me" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
							    <path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
						}
						{
							!this.state.lastStep &&
							<div className="input">
								<input 
									onChange={(e) => this.setState({email: e.target.value})}
									value={this.state.email}
									type="email" 
									placeholder="Email" />
								<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
							    <path className="stroke-me" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
							    <path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
						}
						{
							!this.state.lastStep &&
							<div className="input">
								<input 
									onChange={(e) => this.setState({password: e.target.value})}
									value={this.state.password}
									type="password" 
									placeholder="Password" />
								<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
								  <path d="M0 0h24v24H0z" fill="none"/>
								  <path className="stroke-me" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
								</svg>
							</div>
						}

						{
							this.state.lastStep &&
							<div className="input">
								<input 
									onChange={(e) => this.setState({groupName: e.target.value})}
									value={this.state.groupName}
									type="text" 
									placeholder="Group Name" />
								<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
							    <path className="stroke-me" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
							    <path d="M0 0h24v24H0z" fill="none"/>
								</svg>
							</div>
						}

						{
							this.state.lastStep &&
							<div className="input">
								<input
									onChange={(e) => this.setState({groupPassword: e.target.value})}
									value={this.state.groupPassword} 
									type="password" 
									placeholder="Group password" />
								<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
								  <path d="M0 0h24v24H0z" fill="none"/>
								  <path className="stroke-me" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
								</svg>
							</div>
						}
						<div>
							<button
								className={this.state.buttonClasses} 
								id="signInSignUp" 
								onClick={this.validateLogin}>
								{(this.state.newUser) ? "Sign up" : "Login"}
								<img className="loading-user" src="loader.gif" alt="loading" />
								<img className="loaded-user" src="check.svg" alt="authenticated" />
							</button>
						</div>
					</div>
					<div className="sign-up">
						<h3>{(this.state.newUser)? "Already Signed up?" : "Are you a new user?"}</h3>
						<a onClick={this.newUser}>{(this.state.newUser)? "Login" : "Sign up"}</a>
					</div>
				</div>
			</div>
		);
	}
}	