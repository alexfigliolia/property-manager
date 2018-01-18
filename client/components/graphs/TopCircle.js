import React from 'react';

const TopCircle = (props) => {
	return (
		<circle
			stroke={props.gradient}
			strokeWidth="20" 
			fill='transparent' 
			cx="250" 
			cy="250" 
			r="200"
			strokeLinecap="round"
			style={{
				strokeDasharray: (Math.PI * (2 * 200)),
				strokeDashoffset: props.sdo
			}} />
	);
}

export default TopCircle;