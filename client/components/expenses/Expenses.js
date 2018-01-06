import React, { Component } from 'react';
import Expense from './Expense';
import { commafy } from '../../../helpers/helpers';

export default class Expenses extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		range: [
        new Date().getUTCFullYear().toString(), 
        (parseInt(new Date().getMonth()) < 10) ? ('0' + (parseInt(new Date().getMonth()) + 1)).slice(-2) : (new Date().getMonth() + 1).toString(), 
        new Date().getUTCFullYear().toString(), 
        (parseInt(new Date().getMonth()) < 10) ? ('0' + (parseInt(new Date().getMonth()) + 1)).slice(-2) : (new Date().getMonth() + 1).toString()
      ],
  	}
  	this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  setRange = () => {
    const fromYear = this.refs.from.value.substring(0, 4);
    const toYear = this.refs.to.value.substring(0, 4);
    const fromMonth = this.refs.from.value.substring(this.refs.from.value.length - 2);
    const toMonth = this.refs.to.value.substring(this.refs.to.value.length - 2);
    this.setState({ range: [fromYear, fromMonth, toYear, toMonth] });
  }

  render = () => {
    return (
    	<section className={this.props.classes}>
    		<div>
    			<h2>Recorded Expenses</h2>
    			<h3>{`At ${this.props.property.property}`}</h3>
    			<div className='select-dates'>
    				<div>
    					<label>Date from:</label>
    					<input 
    						ref='from'
    						type='month'
    						onChange={this.setRange}
    						defaultValue={this.state.range[0] + "-" + this.state.range[1]} />
    				</div>
    				<div>
    					<label>Date to:</label>
    					<input 
    						ref='to'
    						type='month'
    						onChange={this.setRange}
    						defaultValue={this.state.range[2] + "-" + this.state.range[3]} />
    				</div>
    			</div>
    			<div className='exp-container'>
    				{
    					this.props.expenses.length > 0 &&
    					this.props.expenses.map((exp, i) => {
    						const d = new Date(exp.date);
    						if( d >= new Date( this.state.range[0] + "/" + parseInt(this.state.range[1]) + "/1") &&
                  d <= new Date(parseInt(this.state.range[2]), parseInt(this.state.range[3]), 0, 23, 59, 59) &&
                  exp.solution.spent > 0 ) 
                {  
	    						const m = this.months[d.getMonth()];
	    						const day = d.getDate();
	    						const y = d.getUTCFullYear();
	    						return (
	    							<Expense
	    								key={i} 
	    								month={m}
	    								day={day}
	    								year={y}
	    								issue={exp.issue}
	    								products={exp.solution.products}
	    								spent={exp.solution.spent} />
	    						);
	    					}
    					})
    				}
    			</div>
    		</div>
    	</section>    
    );
  }
}
