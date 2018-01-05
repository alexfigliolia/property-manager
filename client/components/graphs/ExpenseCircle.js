import React, { Component } from 'react';

export default class ExpenseCircle extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className='circle'>
				<div className='circ'>
  				<svg 
  					viewBox="0 0 500 500" 
  					preserveAspectRatio="xMinYMin meet"
  					style={{
  						filter: `drop-shadow( 0px 0px 5px ${this.props.color})`
  					}}>
  					<linearGradient id="expenseGrad">
	            <stop offset="0%"  stop-color={this.props.color2} />
	            <stop offset="100%" stop-color={this.props.color} />
		        </linearGradient>
						<circle
							stroke="#1A222E"
							strokeWidth="20" 
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round" />
						<circle
							stroke="url(#expenseGrad)"
							strokeWidth="20" 
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round"
							style={{
								strokeDasharray: (Math.PI * (2 * 200)),
								strokeDashoffset: this.props.active ? (Math.PI * (2 * 100)) : (Math.PI * (2 * 199))
							}} />
					</svg>
					<div 
						className="title"
						style={{
							color: this.props.color
						}}>Expenses</div>
  			</div>
			</div>
    );
  }
}