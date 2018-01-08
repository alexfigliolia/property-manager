import React from 'react';
import { commafy } from '../../../helpers/helpers';

const Rent = (props) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
  	<section className={props.classes}>
  		<div>
  			<h2>Rent Collection</h2>
  			<p>{`At ${props.property.property}`}</p>
  			<div>
  				{
  					props.payments.map((payment, i) => {
  						const d = new Date(payment.date);
  						const m = months[d.getMonth()];
  						const date = d.getDate();
  						const year = d.getUTCFullYear();
  						return (
  							<div className='rent-payment' key={i}>
                  <h3>Payment:</h3>
  								<div>
  									<h3><strong>Date:&nbsp;</strong>{`${m} ${date}, ${year}`}</h3>
                    <h3><strong>From:&nbsp;</strong>{payment.label}</h3>
  									<h3><strong>Amount:&nbsp;</strong>${commafy(parseFloat(payment.payment).toFixed(2))}</h3>
  								</div>
  							</div>
  						);
  					})
  				}
  				{
  					props.payments.length === 0 &&
  					<h3>{`No rent has been collected for ${months[new Date().getMonth()]}`}</h3>
  				}
  			</div>
  		</div>
  	</section>    
  );
}

export default Rent;