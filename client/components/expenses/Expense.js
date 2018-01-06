import React from 'react';
import { commafy } from '../../../helpers/helpers';

const Expense = (props) => {
	return (
		<div className='expense'>
			<div>
				<h3>Expense</h3>
				<div>
					<div>
						<h4>Date:</h4><h4>{`${props.month} ${props.day}, ${props.year}`}</h4>
					</div>
					<div>
						<h4>Item(s):</h4><h4>{props.products === "" ? props.issue : props.products}</h4>
					</div>
					<div>
						<h4>Amount:</h4><h4>{`$${commafy(props.spent.toFixed(2))}`}</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Expense;