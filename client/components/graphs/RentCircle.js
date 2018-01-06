import React, { Component } from 'react';
import CountUp, { startAnimation } from 'react-countup';

export default class RentCircle extends Component {

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.active && !this.props.active) startAnimation(this.refs.cu);
	}

	render = () => {
		let graphVal;
		if(this.props.data > 0) {
			const total = this.props.data;
	  	const cap = this.props.expRent;
	  	const val = 200 - ((total*200)/cap);
		  graphVal = isNaN(val) ? 199 : val;
		} else {
			graphVal = 199;
		}
		const gvValid = (Math.PI * (2 * graphVal)) < 0 ? 0 : (Math.PI * (2 * graphVal));
		const sdo = this.props.active ? gvValid : (Math.PI * (2 * 199));
	  return (
	     <div className='circle'>
				<div 
					className='circ'
					onClick={this.props.showRent}>
					<svg
						onMouseEnter={this.toggleShadow} 
						viewBox="0 0 500 500" 
						preserveAspectRatio="xMinYMin meet"
						style={{
							filter: `drop-shadow( 0px 0px 5px ${this.props.color})`
						}}>
						<defs>
			        <linearGradient id="rentGrad">
		            <stop offset="0%"  stopColor={this.props.color2} />
		            <stop offset="100%" stopColor={this.props.color} />
			        </linearGradient>
				    </defs>
						<circle
							stroke="#1A222E"
							strokeWidth="20" 
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round" />
						<circle
							stroke="url(#rentGrad)"
							strokeWidth="20" 
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round"
							style={{
								strokeDasharray: (Math.PI * (2 * 200)),
								strokeDashoffset: sdo
							}} />
					</svg>
					<div 
						className="title"
						style={{
							color: this.props.color
						}}>
						<h3>Rent</h3>
						<h4>
							<CountUp
								start={0}
								end={ this.props.active ? 100 - (100*sdo) / (Math.PI * (2 * 200)) : 0}
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