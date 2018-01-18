import React from 'react';
import CountUp from 'react-countup';
import Ticks from './Ticks';

const ServiceCircle = (props) => {
	let graphVal;
	if(props.data.length > 0) {
		const total = props.data.filter(issue => !issue.solution.completed).length;
  	const cap = props.data.length;
  	const val = (total*200)/cap;
  	graphVal = isNaN(val) ? 199 : val;
	} else {
		graphVal = 199;
	}
	const rotateVal = 360 - ((graphVal*360)/100);
  return (
     <div className='circle'>
			<div 
				onClick={props.showService}
				className='circ'>
				<svg 
					className='circle-container'
					viewBox="0 0 500 500" 
					preserveAspectRatio="xMinYMin meet"
					style={{
						filter: `drop-shadow( 0px 0px 7.5px ${props.color})`
					}}>
					<linearGradient id="serviceGrad">
            <stop offset="0%"  stopColor={props.color2} />
            <stop offset="100%" stopColor={props.color} />
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
							strokeDashoffset: props.active ? (Math.PI * (2 * graphVal)) : (Math.PI * (2 * 199))
						}} />
				</svg>
				<Ticks 
					id='serviceLines'
					color={props.color}
					active={props.active}
					rotation={rotateVal} />
				<Ticks 
					id='serviceLines2'
					color={props.color}
					active={props.active}
					rotation={-1 * (rotateVal/2)} />
				<div 
					className="title"
					style={{
						color: props.color
					}}>
					<h3>Service</h3>
					<h4>
						<CountUp
							start={0}
							end={ props.active ? 100 - ((100 * (Math.PI * (2 * graphVal))) / (Math.PI * (2 * 200))) : 0}
							duration={1.5}
							useEasing={true}
							onStart={e => false} />
					%</h4>
				</div>
			</div>
		</div>
  );
}

export default ServiceCircle;
