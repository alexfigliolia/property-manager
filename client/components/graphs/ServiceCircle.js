import React, { Component } from 'react';

export default class ServiceCircle extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
  	let graphVal;
  	if(this.props.data.length > 0) {
  		const total = this.props.data.filter(payment => !payment.solution.completed).length;
	  	const cap = this.props.data.length;
	  	const val = (total*200)/cap;
	  	graphVal = isNaN(val) ? 199 : val;
  	} else {
  		graphVal = 199;
  	}
    return (
       <div className='circle'>
				<div 
					onClick={this.props.showService}
					className='circ'>
  				<svg 
  					viewBox="0 0 500 500" 
  					preserveAspectRatio="xMinYMin meet"
  					style={{
  						filter: `drop-shadow( 0px 0px 5px ${this.props.color})`
  					}}>
						<circle
							stroke="#1A222E"
							strokeWidth="20" 
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round" />
						<circle
							stroke={this.props.color}
							strokeWidth="20"
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round"
							style={{
								strokeDasharray: (Math.PI * (2 * 200)),
								strokeDashoffset: this.props.active ? (Math.PI * (2 * graphVal)) : (Math.PI * (2 * 199))
							}} />
					</svg>
					<div 
						className="title"
						style={{
							color: graphVal === 0 ? '#fff' : this.props.color
						}}>Service</div>
  			</div>
			</div>
    );
  }
}