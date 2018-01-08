import React, { Component } from 'react';

export default class AddService extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		text: '',
  		classes: 'psr'
  	}
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.classes === 'add-service add-service-show' &&
       nextProps.property !== this.props.property)
    {
      this.setState({ text: "", classes: "psr"});
    }
  }

  submit = () => {
  	const { text } = this.state;
  	const { _id, property } = this.props.property;
  	if(text.length > 3) {
  		this.setState({ classes: "psr psr-complete" });
  		const newIssue = {
  			propId: _id,
	      property: property,
	      issue: text,
	      date: new Date(),
	      images: [],
	      postedBy: Meteor.user().name,
	      solved: false,
	      solution: {
	        completed: false,
	        description: "",
	        products: "",
	        budget: "",
	        spent: 0,
	        postedBy: Meteor.user().name
	      }
	    }
  		Meteor.call('issues.create', _id, property, newIssue, (err, res) => {
  			if(err) {
  				console.log(err);
          // this.props.haveAToast('Error:', "Please check your inputs and try again.");
  			} else {
          // this.props.haveAToast(`${property}:`, 'A new outstanding issue was created for your property');
  				setTimeout(() => {
  					this.setState({ text: "", classes: "psr" }, this.props.toggleMenu);
  				}, 1000);
  			}
  		});
  	} else {
      // this.props.haveAToast('Error:', "Please describe the issue with more than 3 characters");
    }
  }

  render = () => {
    return (
    	<section className={this.props.classes}>
    		<div>
    			<h2>Add Service Item</h2>
    			<p>The items you add will be visible to your group</p>
    			<div>
    				<label htmlFor="addService">Service Item:</label>
    				<input 
    					name="addService" 
    					value={this.state.text}
    					placeholder="Ex: Broken toilet - unit 24C"
    					onChange={(e) => this.setState({text: e.target.value})} />
    			</div>
    			<button 
    				className={this.state.classes}
    				onClick={this.submit}>
    					Post Service Request
    				<img src="check.svg" alt="service item posted!" />
    			</button>
    		</div>
    	</section>
    );
  }
}
