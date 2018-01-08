import React, { Component } from 'react';

export default class CollectPay extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		payment: '',
      label: '',
  		crClasses: 'cr-button'
  	}
  }

  submit = () => {
  	const { payment, label } = this.state;
  	const num = parseFloat(payment);
  	const id = this.props.property._id;
    const lbl = label === '' || label === ' ' ? 'Tenant' : label;
  	this.setState({ crClasses: 'cr-button cr-complete' });
  	if( isNaN(num) ) {
  		this.setState({ crClasses: 'cr-button' });
  	} else {
  		Meteor.call('payments.create', id, num, lbl, (err, res) => {
	  		if(err) {
	  			console.log(err);
	  		} else {
	  			setTimeout(() => {
	  				this.setState({ crClasses: 'cr-button', payment: '', label: '' }, this.props.toggleMenu);
	  			}, 1000);
	  		}
	  	});
  	}
  }

  render = () => {
    return (
    	<section className={this.props.classes}>
    		<div>
    			<h2>Collect Rent</h2>
          <div>
            <label htmlFor="cr">Label:</label>
            <input
              name="lbl"
              type="text"
              placeholder="Ex: Tenant's name or Unit #"
              value={this.state.label}
              onChange={e => this.setState({label: e.target.value})} />
          </div>
    			<div>
    				<label htmlFor="cr">Total Payment Amount</label>
    				<input
    					name="cr"
    					type="number"
    					placeholder="Dollar amount"
    					value={this.state.payment}
    					onChange={e => this.setState({payment: e.target.value})} />
    			</div>
    			<button
    				onClick={this.submit} 
    				className={this.state.crClasses}>
    					Collect Rent
    				<img src="check.svg" alt="collected rent!" />
    			</button>
    		</div>
    	</section> 
    );
  }
}
