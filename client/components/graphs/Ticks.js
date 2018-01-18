import React from 'react';

const Ticks = (props) => {
	return (
		<svg 
			className='ticks' 
			viewBox="0 0 160 160"
			style={{
				transform: props.active ? `rotate(${props.rotation}deg)` : 'rotate(0deg)'
			}}>
		  <defs>
		    <g 
		    	id={props.id} 
		    	stroke={props.color} 
		    	strokeWidth='3' 
		    	strokeLinecap='round'>
		      <line x1=" 71" x2=" 77" />
		      <line x1="-71" x2="-77" />
		      <line y1=" 71" y2=" 77" />
		      <line y1="-71" y2="-77" />
		    </g>
		  </defs>
		  <g transform="translate(80 80)">
		    <use href={`#${props.id}`} transform="rotate( 0)"/>
		    <use href={`#${props.id}`} transform="rotate( 5)"/>
		    <use href={`#${props.id}`} transform="rotate(10)"/>
		    <use href={`#${props.id}`} transform="rotate(15)"/>
		    <use href={`#${props.id}`} transform="rotate(20)"/>
		    <use href={`#${props.id}`} transform="rotate(25)"/>
		    <use href={`#${props.id}`} transform="rotate(30)"/>
		    <use href={`#${props.id}`} transform="rotate(35)"/>
		    <use href={`#${props.id}`} transform="rotate(40)"/>
		    <use href={`#${props.id}`} transform="rotate(45)"/>
		    <use href={`#${props.id}`} transform="rotate(50)"/>
		    <use href={`#${props.id}`} transform="rotate(55)"/>
		    <use href={`#${props.id}`} transform="rotate(60)"/>
		    <use href={`#${props.id}`} transform="rotate(65)"/>
		    <use href={`#${props.id}`} transform="rotate(70)"/>
		    <use href={`#${props.id}`} transform="rotate(75)"/>
		    <use href={`#${props.id}`} transform="rotate(80)"/>
		    <use href={`#${props.id}`} transform="rotate(85)"/>
		  </g>
		</svg>
	);
}

export default Ticks;