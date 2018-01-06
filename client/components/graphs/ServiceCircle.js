import React, { Component } from 'react';
import CountUp, { startAnimation } from 'react-countup';

export default class ServiceCircle extends Component {
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
						<linearGradient id="serviceGrad">
	            <stop offset="0%"  stopColor={this.props.color2} />
	            <stop offset="100%" stopColor={this.props.color} />
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
							stroke="url(#serviceGrad)"
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
							color: this.props.color
						}}>
						<h3>Service</h3>
						<h4>
							<CountUp
								start={0}
								end={ this.props.active ? 100 - ((100 * (Math.PI * (2 * graphVal))) / (Math.PI * (2 * 200))) : 0}
								duration={1.5}
								useEasing={true}
								ref="cu"
								onStart={e => false} />
						%</h4>
					</div>
				</div>
			</div>
	  );
	}
}