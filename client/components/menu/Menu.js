import React from 'react';

const Menu = (props) => {
	return (
		<section className={props.classes}>
			<nav>
				<a onClick={props.collectRent}>Collect Rent</a>
				<a onClick={props.addService}>Add Service Item</a>
				<a onClick={props.paybill}>Pay a Bill</a>
				<button onClick={() => Meteor.logout()}>Log Out</button>	
			</nav>
		</section>
	);
}

export default Menu;