import React from 'react';

const Header = (props) => {
	return (
		<header className={props.classes}>
			<div>
				<button
					onClick={props.showChat}>
					<svg 
						version="1.1" 
						id="Layer_1" 
						x="0px" 
						y="0px" 
						width="56.689px" 
						height="56.689px" 
						viewBox="0 0 56.689 56.689" 
						enableBackground="new 0 0 56.689 56.689">
						<path fill="#3C568A" d="M49.485,21.401h-6.176V8.821c0-3.124-2.542-5.665-5.666-5.665H8.156c-3.123,0-5.664,2.542-5.664,5.665v19.895
							c0,3.124,2.541,5.667,5.664,5.667h0.409l-0.062,8.406l12.169-8.406h0.638v7.563c0,2.598,2.114,4.713,4.713,4.713h13.438l9.954,6.877
							l-0.05-6.877h0.118c2.599,0,4.713-2.115,4.713-4.713V26.114C54.198,23.515,52.083,21.401,49.485,21.401z M20.05,32.382l-9.519,6.574
							l0.049-6.574H8.156c-2.021,0-3.664-1.645-3.664-3.667V8.821c0-2.021,1.644-3.665,3.664-3.665h29.486
							c2.021,0,3.666,1.644,3.666,3.665v12.58v7.314c0,2.022-1.645,3.667-3.666,3.667H21.311H20.05z M52.198,41.945
							c0,1.496-1.217,2.713-2.713,2.713h-2.134l0.038,5.045l-7.304-5.045H26.024c-1.496,0-2.713-1.217-2.713-2.713v-7.563h14.332
							c3.124,0,5.666-2.543,5.666-5.667v-5.314h6.176c1.496,0,2.713,1.217,2.713,2.713V41.945z M17.328,18.301
							c0,1.289-1.045,2.333-2.334,2.333s-2.334-1.044-2.334-2.333s1.045-2.333,2.334-2.333S17.328,17.011,17.328,18.301z M25.233,18.301
							c0,1.289-1.043,2.333-2.332,2.333s-2.334-1.044-2.334-2.333s1.045-2.333,2.334-2.333S25.233,17.011,25.233,18.301z M33.139,18.559
							c0,1.288-1.045,2.332-2.332,2.332c-1.289,0-2.334-1.044-2.334-2.332s1.045-2.333,2.334-2.333
							C32.094,16.226,33.139,17.271,33.139,18.559z"/>
					</svg>
				</button>
				<button></button>
				<button></button>
				<button 
					className={props.burgerClasses}
					onClick={props.toggleMenu}>
					<div>
						<div id="top"></div>
						<div id="middle"></div>
						<div id="bottom"></div>
					</div>
				</button>
			</div>
		</header>
	);
}

export default Header;