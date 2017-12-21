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

 	delete = () => {
 		const id = this.props.issue._id;
    const idx = this.props.index;
    this.flip();
    setTimeout(() => {
    	Meteor.call('issue.delete', id, (err, res) => {
	      if(err) {
	        console.log(err);
	      } else {
	        // this.props.haveAToast('Issue Deleted:', `You deleted the "${this.props.issues[idx].issue}" service item`);
	      }
	    });
    }, 200);
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
							<button
								data-id={this.props.issue._id} 
								onClick={this.props.solve}>Solve</button>
						</div>
					}
				</div>
				<div className="back">
					<h3>Are you sure you want this item deleted?</h3>
					<div className='buttons'>
						<button onClick={this.flip}>No</button>
						<button onClick={this.delete}>Yes</button>
					</div>
				</div>
			</div>
    );
  }
}

