import React from 'react';
import CountUp from 'react-countup';
import BaseCircle from './BaseCircle';
import TopCircle from './TopCircle';

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
					<BaseCircle />
					<TopCircle
						gradient="url(#serviceGrad)"
						sdo={props.active ? (Math.PI * (2 * graphVal)) : (Math.PI * (2 * 199))} />
				</svg>
				<img 
					src='ticks.png' 
					alt='ticks'
					style={{
						transform: props.active ? `rotate(${rotateVal}deg)` : `rotate(0deg)`,
					}} />
				<div 
					className="title"
					style={{ color: props.color }}>
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
