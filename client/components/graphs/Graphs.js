import React, { Component } from 'react';
import RentCircle from './RentCircle';
import ServiceCircle from './ServiceCircle';
import ExpenseCircle from './ExpenseCircle';
import { checkDate } from '../../../helpers/helpers';


export default class Graphs extends Component {
  constructor(props) {
  	super(props);
  }

  componentDidMount = () => {
    if(this.props.index === this.props.length) setTimeout(this.props.init(), 200);
  };

  render = () => {
    return (
    	<div 
				className="circ-section-container"
				style={{ maxWidth: `${this.props.height - 100}px`}}>
				<div 
  				className='circ-section'>
          <RentCircle
            active={this.props.active}
            color="#5BDC70"
            expRent={this.props.property.monthRentExpected}
            data={this.props.payments.filter(payment => checkDate(payment.date)).reduce((acc, cur) => acc + cur.payment, 0)} />
          <ServiceCircle 
            active={this.props.active}
            color="#F66463"
            data={this.props.issues.filter(issue => checkDate(issue.date)) || !issue.solution.completed}
            showService={this.props.showService} />
          <ExpenseCircle 
            active={this.props.active}
            color="#91A7E0"
            data={this.props.issues.filter(issue => checkDate(issue.date) && issue.solution.completed && issue.issue === issue.solution.products)} />
  			</div>
			</div>    
    );
  }
}

