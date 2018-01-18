import React from 'react';

const BaseCircle = (props) => {
	return (
		<circle
			stroke="#222D3F"
			strokeWidth="20" 
			fill='transparent' 
			cx="250" 
			cy="250" 
			r="200"
			strokeLinecap="round" />
	);
}

export default BaseCircle;