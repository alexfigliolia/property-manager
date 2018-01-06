import React, { Component, PropTypes } from 'react';

export default class PayBill extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render = () => {
    return (
    	<section className={this.props.classes}>
    		<div>
    			<h2>Pay a bill</h2>
    		</div>
    	</section>  
    );
	}
}
