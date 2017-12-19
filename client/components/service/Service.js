import React, { Component } from 'react';
import ServiceItem from './ServiceItem'
import { checkDate } from '../../../helpers/helpers';

export default class Service extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
    return (
    	<section 
    		className={this.props.classes} 
    		style={{
    			height: this.props.height - 50,
    			maxHeight: this.props.height - 50
    		}}>
    		<div>
    			<h2>Service Items</h2>
    			<div className="service-items">
    				{
    					this.props.issues
              .filter(issue => issue.solution.completed === false)
    					.map((issue, i) => {
    						return (
    							<ServiceItem 
    								key={i}
    								issue={issue.issue} />
    						);
    					})
    				}
    			</div>
    		</div>
    	</section>
    );
  }
}
