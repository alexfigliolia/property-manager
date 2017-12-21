import React, { Component } from 'react';
import ServiceItem from './ServiceItem'
import ProgressItem from './ProgressItem'
import { checkDate } from '../../../helpers/helpers';

export default class Service extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
    const inProgress = this.props.issues
    .filter(issue => issue.solution.completed === false && issue.solved === true);
    const toSolve = this.props.issues
    .filter(issue => issue.solution.completed === false);
    return (
    	<section 
    		className={this.props.classes} 
    		style={{
    			height: this.props.height - 50,
    			maxHeight: this.props.height - 50
    		}}>
    		<div>
    			<div 
            className='service-container'
            style={{justifyContent: inProgress.length > 0 ? 'space-between' : 'center'}}>
            <div className="service-items">
              <h2>{toSolve.length > 0 ? 'Service Items' : 'Nothing to see here'}</h2>
              {
                toSolve.map((issue, i) => {
                  return (
                    <ServiceItem 
                      key={i}
                      index={i}
                      issue={issue}
                      solve={this.props.solve} />
                  );
                })
              }
            </div>
            {
              inProgress.length > 0 &&
              <div className="service-items in-progress-items">
                <h2>In Progress</h2>
                {
                  inProgress.map((issue, i) => {
                    return (
                      <ProgressItem 
                        key={i}
                        issue={issue}
                        solve={this.props.solve} />
                    );
                  })
                }
              </div>
            }
          </div>
    		</div>
    	</section>
    );
  }
}