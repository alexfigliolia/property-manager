import React, { Component } from 'react';

export default class ServiceItem extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		classes: 'service-item'
  	}
  }

 	flip = () => {
 		this.setState(prevState => {
 			return {
 				classes: prevState.classes === 'service-item' ? 
 								'service-item service-item-flip' 
 								: 'service-item'
 			}
 		});
 	}

  render = () => {
    return (
      <div 
				className={this.state.classes}>
				<div className='front'>
					<h3>{this.props.issue.issue}</h3>
					{
						this.props.issue.solved ? 
						<div className="solved">
							<h4>Solution Posted</h4>
							<img src='check-g.svg' alt="issue has a solution" />
						</div>
						:
						<div className='buttons'>
							<button onClick={this.flip}>Delete</button>
							<button>Solve</button>
						</div>
					}
				</div>
				<div className="back">
					<h3>Are you sure you want this item deleted?</h3>
					<div className='buttons'>
						<button onClick={this.flip}>No</button>
						<button>Yes</button>
					</div>
				</div>
			</div>
    );
  }
}

