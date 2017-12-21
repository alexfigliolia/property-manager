import React, { Component } from 'react';

export default class PostSolution extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		solution: '',
  		products: '',
  		checked: false,
  		classes: 'ps-button',
  		budget: ''
  	}
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.issue[0]) {
      this.refs.postSolution.scrollTop = 0;
      if(nextProps.issue[0] !== this.props.issue[0]) {
        this.setState({
          solution: nextProps.issue[0].solution.description,
          products: nextProps.issue[0].solution.products,
          checked: nextProps.issue[0].solution.budget > 0 ? true : false,
          budget: nextProps.issue[0].solution.budget,
          classes: 'ps-button'
        });
      }
    }
  }

  submit = () => {
  	const { solution, products, budget, checked } = this.state;
  	const bValue = checked ? parseFloat(budget) : 0;
  	if(solution !== '' && solution !== ' ') {
  		const obj = {
        completed: false,
        description: solution,
        products: products,
        budget: bValue
      };
      this.setState({classes: 'ps-button ps-button-donedid'});
      Meteor.call('issue.postSolution', this.props.issue[0]._id, obj, (err, res) => {
        if(err) {
          console.log(err);
          this.handleSubmitReset({ classes: 'ps-button ps-button-error' });
          // this.props.haveAToast('Error:', 'Please check your inputs and try again.');
        } else {
          this.handleSubmitReset({ classes: 'ps-button ps-button-donedid' }, this.props.toggleMenu);
          // this.props.haveAToast('Solved:', `You posted a solution for the "${this.props.issue[0].issue}" service item`);
        }
      });
    } else {
      this.handleSubmitReset({ classes: 'ps-button ps-button-error' });
      // this.props.haveAToast('Error:', 'Please check your inputs and try again.');
    }
  }

  handleSubmitReset = (obj, cb) => {
    this.setState(obj);
    setTimeout(() => { 
      this.setState({ classes: 'ps-button' }, () => {
        if(cb) cb(); 
      });
    }, 1000);
  }

  render = () => {
    return (
    	<section 
        className={this.props.classes}
        ref="postSolution">
    		<div>
    			<h2><div></div>Post Solution</h2>
    			<p><strong>Issue: </strong>{this.props.issue.length > 0 ? this.props.issue[0].issue : ""}</p>
    			<div className="inputs">
    				<label htmlFor="solution">Description of Solution:</label>
    				<textarea
    					name="solution"
    					placeholder="Ex: Call Joe's Plumbing service and get a quote. This field is required"
    					value={this.state.solution}
    					onChange={e => this.setState({solution: e.target.value})}></textarea>
    				<label htmlFor="products">Products required:</label>
    				<textarea
    					name="products"
    					placeholder="Ex: Kholer Toilet"
    					value={this.state.products}
    					onChange={e => this.setState({products: e.target.value})}></textarea>
  					<fieldset>Will this solution require spending?</fieldset>
            <div className="checkboxes">
              <label htmlFor="yes">Yes</label>
              <input
              	name="yes" 
              	type="checkbox" 
              	checked={this.state.checked} 
              	onChange={(e) => this.setState({ checked: true })} />
              <label htmlFor="no">No</label>
              <input 
              	name="no"
              	type="checkbox" 
              	checked={!this.state.checked} 
              	onChange={(e) => this.setState({ checked: false })} />
            </div>
            {
            	this.state.checked &&
            	<div className="budg">
            		<label htmlFor="budget">Set a budget:</label>
            		<input 
                  value={this.state.budget}
            			type="number"
            			placeholder="Dollar amount"
            			onChange={e => this.setState({budget: e.target.value})} />
            	</div>
            }
    			</div>
    			<button 
    				className={this.state.classes}
    				onClick={this.submit}>
    				Post Solution
    				<img src="check.svg" alt="solution posted!" />
    				<img src="close2.svg" alt="error posting solution!" />
    			</button>
    		</div>
    	</section>  
    );
  }
}
