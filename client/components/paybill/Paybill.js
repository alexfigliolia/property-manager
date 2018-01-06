import React, { Component, PropTypes } from 'react';

export default class PayBill extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expense: '',
			amount: '',
			classes: 'pb'
		}
	}

	submit = () => {
		const { amount, expense } = this.state;
		if( !isNaN(parseFloat(amount)) && expense !== '') {
			this.setState({ classes: 'pb pb-complete' });
			const bill = {
	      propId: this.props.property._id,
	      property: this.props.property.property,
	      issue: this.state.expense,
	      date: new Date(),
	      images: [],
	      postedBy: Meteor.user().name,
	      solved: true,
	      solution: {
	        completed: true,
	        description: expense,
	        products: expense,
	        budget: parseFloat(amount),
	        spent: parseFloat(amount),
	        postedBy: Meteor.user().name
	      }
	    };
	    Meteor.call('issues.create', this.props.property._id, this.props.property.property, bill, (err, res) => {
  			if(err) {
  				// console.log(err);
  			} else {
  				setTimeout(() => {
  					this.setState({ classes: 'pb', amount: '', expense: '' }, this.props.toggleMenu);
  				}, 800)
  			}
  		});
		}
	}

	render = () => {
    return (
    	<section className={this.props.classes}>
    		<div>
    			<h2>Pay a bill</h2>
    			<h3>{`For ${this.props.property.property}`}</h3>
    			<div>
    				<div className='input'>
    					<label htmlFor='expense'>Expense:</label>
    					<input
    						id='expense' 
    						type='text'
    						placeholder='Ex: Electricity Company'
    						value={this.state.expense}
    						onChange={e => this.setState({expense: e.target.value})} />
    				</div>
    				<div className='input'>
    					<input
    						id='amount' 
    						type='number'
    						placeholder='Dollar Amount'
    						value={this.state.amount}
    						onChange={e => this.setState({amount: e.target.value})} />
    				</div>
    			</div>
    			<button 
    				className={this.state.classes}
    				onClick={this.submit}>
    					Pay a bill
    				<img src='check.svg' alt='bill payed!' />
    			</button>
    		</div>
    	</section>  
    );
	}
}
