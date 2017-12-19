import React, { Component } from 'react';
import ServiceItem from './ServiceItem'
import ProgressItem from './ProgressItem'
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
    			<div className='service-container'>
            <div className="service-items">
              <h2>Service Items</h2>
              {
                this.props.issues
                .filter(issue => issue.solution.completed === false)
                .map((issue, i) => {
                  return (
                    <ServiceItem 
                      key={i}
                      issue={issue} />
                  );
                })
              }
            </div>
            <div className="service-items in-progress-items">
              <h2>In Progress</h2>
              {
                this.props.issues
                .filter(issue => issue.solution.completed === false && issue.solved === true)
                .map((issue, i) => {
                  return (
                    <ProgressItem 
                      key={i}
                      issue={issue} />
                  );
                })
              }
            </div>
          </div>
    		</div>
    	</section>
    );
  }
}