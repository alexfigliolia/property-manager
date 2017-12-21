import React, { Component } from 'react';
import { getFirstWord } from '../../../helpers/helpers';

export default class ProgressItem extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		classes: 'service-item progress-item',
  		spent: ''
  	}
  }

  componentWillReceiveProps = (nextProps) => {
  	if(nextProps.issue !== this.props.issue) {
  		this.setState({ classes: 'service-item progress-item' });
  	}
  }

  flip = () => {
 		this.setState(prevState => {
 			return {
 				classes: prevState.classes === 'service-item progress-item' ? 
 								'service-item progress-item service-item-flip' 
 								: 'service-item progress-item'
 			}
 		});
 	}

 	markComplete = () => {
 		if(this.props.issue.solution.budget == 0) {
 			this.handleComplete(0);
 		} else {
 			this.setState({
 				classes: 'service-item progress-item service-item-flip progress-item-spent'
 			});
 		}
 	}

 	cancel = () => {
 		this.setState({ classes: 'service-item progress-item service-item-flip' });
 		setTimeout(() => {
 			this.setState({ classes: 'service-item progress-item' });
 		}, 300)
 	}

 	handleComplete = (spent) => {
 		const dough = spent == 0 ? parseFloat(spent) : parseFloat(this.state.spent);
 		if(isNaN(dough)) {
 			this.setState({ spent: '' }, () => {
 				this.refs.amountSpent.placeholder = 'Only numbers are valid';
 			});
 		} else {
 			this.flip();
	 		setTimeout(() => {
	 			Meteor.call('issue.markComplete', this.props.issue._id, dough, (err, res) => {
		      if(err) {
		      	console.log(err);
		        // this.props.haveAToast("Error:", 'There was a problem with our connection. Please try again.');
		      } else {
		        // this.props.haveAToast("Success:", `You marked the "${this.props.issue[e.target.dataset.idx].issue}" as complete`);
		        this.refs.amountSpent.placeholder = 'Dollar amount';
		      }
		    });
	 		}, 300);
 		}
 	}

  render = () => {
    return (
    	<div 
				className={this.state.classes}>
				<div className='front'>
					<h3>{this.props.issue.issue}</h3>
					<span onClick={this.flip}>Status: <strong>In progress</strong></span>
					<p><strong>Solution: </strong>{this.props.issue.solution.description}</p>
					<div className='buttons'>
						<div>{getFirstWord(this.props.issue.solution.postedBy)}</div>
						<div>Budget: {this.props.issue.solution.budget}</div>
					</div>
					<button
						data-id={this.props.issue._id} 
						className="edit"
						onClick={this.props.solve}></button>
					<button 
						onClick={this.props.showImages}
						data-id={this.props.issue._id} 
						className="image-button"></button>
				</div>
				<div className="back">
					<h3>Mark as complete?</h3>
					<div className='buttons'>
						<button onClick={this.flip}>No</button>
						<button onClick={this.markComplete}>Yes</button>
					</div>
					{
						this.props.issue.solution.budget > 0 &&
						<div className='total-spent'>
							<div className='top'>
								<h3>Total spent fixing this issue</h3>
								<div>
									<input
										ref="amountSpent"
										onChange={(e) => this.setState({spent: e.target.value})} 
										type="number" 
										value={this.state.spent}
										placeholder="Dollar amount" />
								</div>
							</div>
							<div className="buttons">
								<button onClick={this.cancel}>Cancel</button>
								<button onClick={this.handleComplete}>Mark complete</button>
							</div>
						</div>
					}
				</div>
			</div>    
    );
  }
}
