import React from 'react';
import CountUp from 'react-countup';
import BaseCircle from './BaseCircle';
import TopCircle from './TopCircle';

const RentCircle = (props) => {
	let graphVal;
	if(props.data > 0) {
		const total = props.data;
  	const cap = props.expRent;
  	const val = 200 - ((total*200)/cap);
	  graphVal = isNaN(val) ? 199 : val;
	} else {
		graphVal = 199;
	}
	const gvValid = (Math.PI * (2 * graphVal)) < 0 ? 0 : (Math.PI * (2 * graphVal));
	const sdo = props.active ? gvValid : (Math.PI * (2 * 199));
	const rotateVal = 360 - ((graphVal*360)/100);
  return (
     <div className='circle'>
			<div 
				className='circ'
				onClick={props.showRent}>
				<svg
					className='circle-container'
					viewBox="0 0 500 500" 
					preserveAspectRatio="xMinYMin meet"
					style={{
						filter: `drop-shadow( 0px 0px 7.5px ${props.color})`
					}}>
					<defs>
		        <linearGradient id="rentGrad">
	            <stop offset="0%"  stopColor={props.color2} />
	            <stop offset="100%" stopColor={props.color} />
		        </linearGradient>
			    </defs>
					<BaseCircle />
					<TopCircle
						gradient="url(#rentGrad)"
						sdo={sdo} />
				</svg>
				<img 
					src='ticks.png' 
					alt='ticks'
					style={{
						transform: props.active ? `rotate(${rotateVal}deg)` : `rotate(0deg)`,
					}} />
				<img 
					src='ticks.png' 
					alt='ticks'
					style={{
						transform: props.active ? `rotate(${-1*rotateVal}deg)` : `rotate(0deg)`
					}} />
				<div 
					className="title"
					style={{ color: props.color }}>
					<h3>Rent</h3>
					<h4>
						<CountUp
							start={0}
							end={ props.active ? 100 - (100*sdo) / (Math.PI * (2 * 200)) : 0}
							duration={1.5}
							useEasing={true}
							onStart={e => false} />
					%</h4>
				</div>
			</div>
		</div>
  );
}

export default RentCircle;