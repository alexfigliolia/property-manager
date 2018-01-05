import React from 'react';

const ServiceCircle = (props) => {
	let graphVal;
	if(props.data.length > 0) {
		const total = props.data.filter(payment => !payment.solution.completed).length;
  	const cap = props.data.length;
  	const val = (total*200)/cap;
  	graphVal = isNaN(val) ? 199 : val;
	} else {
		graphVal = 199;
	}
  return (
     <div className='circle'>
			<div 
				onClick={props.showService}
				className='circ'>
				<svg 
					viewBox="0 0 500 500" 
					preserveAspectRatio="xMinYMin meet"
					style={{
						filter: `drop-shadow( 0px 0px 5px ${props.color})`
					}}>
					<linearGradient id="serviceGrad">
            <stop offset="0%"  stop-color={props.color2} />
            <stop offset="100%" stop-color={props.color} />
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
				<div 
					className="title"
					style={{
						color: graphVal === 0 ? '#fff' : props.color
					}}>Service</div>
			</div>
		</div>
  );
}

export default ServiceCircle;