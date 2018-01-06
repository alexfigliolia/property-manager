import React from 'react';
import CountUp from 'react-countup';

const ExpenseCircle = (props) => {
	const spent = props.data.reduce((acc, cur) => acc + cur.solution.spent, 0);
	let graphVal = (spent*200)/props.total;
	graphVal = graphVal === 0 || isNaN(graphVal) ? 1 : graphVal;
	return (
    <div className='circle'>
			<div className='circ'>
				<svg 
					viewBox="0 0 500 500" 
					preserveAspectRatio="xMinYMin meet"
					style={{
						filter: `drop-shadow( 0px 0px 7.5px ${props.color})`
					}}>
					<linearGradient id="expenseGrad">
            <stop offset="0%"  stopColor={props.color2} />
            <stop offset="100%" stopColor={props.color} />
	        </linearGradient>
					<circle
						stroke="#1A222E"
						strokeWidth="20" 
						fill='transparent' 
						cx="250" 
						cy="250" 
						r="200"
						strokeLinecap="round" />
					<circle
						stroke="url(#expenseGrad)"
						strokeWidth="20" 
						fill='transparent' 
						cx="250" 
						cy="250" 
						r="200"
						strokeLinecap="round"
						style={{
							strokeDasharray: (Math.PI * (2 * 200)),
							strokeDashoffset: props.active ? (Math.PI * (2 * 200)) - graphVal : (Math.PI * (2 * 199))
						}} />
				</svg>
				<div 
					className="title"
					style={{
						color: props.color
					}}>
					<h3>Expenses</h3>
					<h4>
						<CountUp
							start={0}
							end={props.active ? (graphVal * 100) / 200 : 0}
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