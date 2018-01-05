import React from 'react';

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
	const sdo = props.active ? gvValid : (Math.PI * (2 * 199))
  return (
     <div className='circle'>
			<div 
				className='circ'
				onClick={props.showRent}>
				<svg
					onMouseEnter={this.toggleShadow} 
					viewBox="0 0 500 500" 
					preserveAspectRatio="xMinYMin meet"
					style={{
						filter: `drop-shadow( 0px 0px 5px ${props.color})`
					}}>
					<defs>
		        <linearGradient id="rentGrad">
	            <stop offset="0%"  stop-color={props.color2} />
	            <stop offset="100%" stop-color={props.color} />
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
						color: gvValid === 0 ? '#fff' : props.color
					}}>Rent</div>
			</div>
		</div>
  );
}

export default RentCircle;