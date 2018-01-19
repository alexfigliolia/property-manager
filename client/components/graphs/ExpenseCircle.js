import React from 'react';
import CountUp from 'react-countup';
import BaseCircle from './BaseCircle';
import TopCircle from './TopCircle';

const ExpenseCircle = (props) => {
	const spent = props.data.reduce((acc, cur) => acc + parseFloat(cur.solution.spent), 0);
	let perc = (spent * 100)/props.total;
	perc = isNaN(perc) ? 0 : perc;
	let graphVal = perc === 0 ? 1 : perc;
	graphVal = (Math.PI * (2 * 200)) - (graphVal*(Math.PI * (2 * 200))) / 100;
	const rotateVal = (graphVal*360)/(Math.PI * (2 * 200));
	return (
    <div className='circle'>
			<div 
				className='circ'
				onClick={props.showExpenses}>
				<svg 
					className='circle-container'
					viewBox="0 0 500 500" 
					preserveAspectRatio="xMinYMin meet"
					style={{
						filter: `drop-shadow( 0px 0px 7.5px ${props.color})`
					}}>
					<linearGradient id="expenseGrad">
            <stop offset="0%"  stopColor={props.color2} />
            <stop offset="100%" stopColor={props.color} />
	        </linearGradient>
					<BaseCircle />
					<TopCircle 
						gradient="url(#expenseGrad)"
						sdo={props.active ? graphVal : (Math.PI * (2 * 199))} />
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
					<h3>Expenses</h3>
					<h4>
						<CountUp
							start={0}
							end={props.active ? perc : 0}
							duration={1.5}
							useEasing={true}
							onStart={e => false} />
					%</h4>
				</div>
			</div>
		</div>
  );
}

export default ExpenseCircle;