import React, { Component } from 'react';

export default class RentCircle extends Component {
  constructor(props) {
    super(props);
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
						<circle
							stroke="#1A222E"
							strokeWidth="20" 
							fill='transparent' 
							cx="250" 
							cy="250" 
							r="200"
							strokeLinecap="round" />
						<circle
							stroke={this.props.color}
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
							color: graphVal === 0 ? '#fff' : this.props.color
						}}>Rent</div>
  			</div>
			</div>
    );
  }
}