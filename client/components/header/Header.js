import React from 'react';

const Header = (props) => {
	return (
		<header className={props.classes}>
			<h1
				style={{color: props.headerText[1]}}>{props.headerText[0]}</h1>
			<div>
				<button
					onClick={props.toggleChat}>
					<svg 
						version="1.1" 
						id="Layer_1" 
						x="0px" 
						y="0px" 
						width="56.689px" 
						height="56.689px" 
						viewBox="0 0 56.689 56.689" 
						enableBackground="new 0 0 56.689 56.689">
						<path 
							fill="#3C568A" 
							d="M49.485,21.401h-6.176V8.821c0-3.124-2.542-5.665-5.666-5.665H8.156c-3.123,0-5.664,2.542-5.664,5.665v19.895
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
				<button
					onClick={props.showAddService}>
					<svg version="1.1" id="Layer_1" x="0px" y="0px"
						 width="56.69px" height="56.69px" viewBox="0 0 56.69 56.69" enableBackground="new 0 0 56.69 56.69">
						<path fill="#3C568A" d="M51.442,5.199c-1.388-1.388-3.234-2.152-5.198-2.152s-3.81,0.764-5.197,2.152L28.054,18.194l0.503,0.691
						c0.281,0.387,0.271,0.898-0.01,1.266l-0.134-0.133c-1.156-1.158-3.176-1.16-4.334-0.001c-1.193,1.194-1.193,3.137,0,4.333
						l2.659,2.658L8.633,45.111l-3.091,0.739l-2.447,4.895l2.898,2.898l4.893-2.447l0.772-3.219l-0.048-0.049l18.025-18.025l2.659,2.658
						c0.578,0.578,1.348,0.897,2.166,0.897s1.588-0.319,2.166-0.897c0.578-0.579,0.896-1.349,0.896-2.166
						c0-0.818-0.319-1.588-0.897-2.166l-0.135-0.135c0.361-0.275,0.895-0.281,1.267-0.009l0.691,0.503l12.993-12.993
						c1.389-1.388,2.153-3.234,2.153-5.198C53.597,8.434,52.831,6.587,51.442,5.199z M50.028,14.181L38.153,26.056
						c-1.078-0.383-2.357-0.107-3.184,0.72c-0.307,0.308-0.541,0.683-0.698,1.114l-0.217,0.598l1.157,1.157
						c0.201,0.2,0.312,0.467,0.312,0.751c0,0.283-0.111,0.551-0.313,0.752c-0.4,0.402-1.1,0.402-1.502,0l-8.215-8.213
						c-0.415-0.415-0.415-1.09-0.001-1.504c0.201-0.202,0.469-0.313,0.754-0.313c0.283,0,0.55,0.11,0.751,0.312l1.158,1.158l0.599-0.219
						c0.433-0.158,0.807-0.393,1.112-0.698c0.855-0.855,1.109-2.093,0.72-3.182L42.461,6.613c1.011-1.01,2.354-1.566,3.783-1.566
						c0.805,0,1.573,0.193,2.279,0.527L34.268,19.831c-0.61,0.61-0.61,1.6,0,2.21c0.61,0.61,1.6,0.61,2.21,0L50.835,7.684
						c0.484,0.816,0.761,1.741,0.761,2.714C51.596,11.827,51.039,13.171,50.028,14.181z"/>
					</svg>
				</button>
				<button>
					<svg version="1.1" id="Layer_1" x="0px" y="0px"
						 width="56.69px" height="56.69px" viewBox="0 0 56.69 56.69" enableBackground="new 0 0 56.69 56.69">
							<path fill="#3C568A" d="M54.162,29.047c-0.214-0.236-0.855-0.552-1.583-0.78c-0.027-0.211-0.078-0.414-0.155-0.602
						c-0.249-0.602-0.737-0.977-1.373-1.055c-1.099-0.133-2.295,0.385-3.153,0.873c-1.731-6.04-6.791-11.056-13.552-13.168
						c0.494-1.039,0.778-2.195,0.778-3.421c0-4.415-3.593-8.008-8.009-8.008c-4.415,0-8.007,3.593-8.007,8.008
						c0,1.27,0.305,2.466,0.832,3.534c-2.295,0.76-4.461,1.857-6.335,3.262c-2.129-1.111-4.454-1.094-6.028,0.081l-0.802,0.598
						l2.644,3.542c-1.313,1.814-2.253,3.792-2.802,5.897H5.5c-1.71,0-3.102,1.392-3.102,3.103v8.936c0,1.711,1.392,3.103,3.102,3.103
						h4.425c1.297,1.635,2.871,3.068,4.692,4.271v4.18c0,1.266,0.92,2.296,2.051,2.296h3.811c1.131,0,2.051-1.03,2.051-2.296v-0.923
						c2.922,0.601,5.9,0.656,8.952,0.102v0.93c0,1.266,0.92,2.295,2.051,2.295h3.811c1.131,0,2.051-1.029,2.051-2.295v-3.908
						c5.745-3.533,9.155-9.289,9.155-15.507c0-1.226-0.15-2.428-0.41-3.601c0.781-0.48,1.892-1.006,2.788-0.891
						c0.268,0.033,0.445,0.164,0.558,0.41c-0.615-0.088-1.173-0.053-1.474,0.198c-0.427,0.356-0.614,0.951-0.465,1.48
						c0.16,0.57,0.659,0.957,1.37,1.063c0.057,0.008,0.114,0.013,0.171,0.013c0.378,0,0.73-0.188,1.005-0.541
						c0.203-0.26,0.348-0.586,0.43-0.935c0.425,0.142,0.783,0.302,0.9,0.427c0.187,0.205,0.502,0.22,0.706,0.034
						S54.348,29.252,54.162,29.047z M27.115,4.887c3.314,0,6.009,2.695,6.009,6.008c0,1.236-0.376,2.386-1.018,3.341l-0.034,0.048
						c-0.027,0.04-0.058,0.076-0.086,0.115c-0.115,0.159-0.237,0.312-0.365,0.457c-0.034,0.04-0.07,0.078-0.105,0.117
						c-0.127,0.136-0.259,0.266-0.396,0.389c-0.031,0.027-0.061,0.056-0.092,0.083c-0.351,0.301-0.731,0.562-1.138,0.773
						c-0.014,0.008-0.028,0.014-0.042,0.021c-0.185,0.095-0.374,0.179-0.567,0.254c-0.042,0.017-0.085,0.031-0.128,0.047
						c-0.168,0.062-0.339,0.114-0.513,0.16c-0.054,0.014-0.107,0.029-0.162,0.042c-0.17,0.039-0.343,0.069-0.516,0.095
						c-0.056,0.008-0.109,0.019-0.165,0.025c-0.226,0.025-0.453,0.041-0.683,0.041c-0.228,0-0.454-0.015-0.679-0.041
						c-0.047-0.005-0.093-0.015-0.141-0.021c-0.182-0.025-0.362-0.057-0.541-0.099c-0.041-0.009-0.081-0.021-0.121-0.031
						c-0.188-0.049-0.375-0.104-0.558-0.171c-0.025-0.01-0.052-0.019-0.077-0.028c-0.855-0.326-1.635-0.845-2.27-1.523
						c-0.017-0.018-0.032-0.036-0.049-0.055c-0.143-0.155-0.277-0.319-0.403-0.491c-0.031-0.043-0.065-0.085-0.096-0.128l-0.054-0.074
						c-0.644-0.957-1.02-2.107-1.02-3.345C21.108,7.582,23.802,4.887,27.115,4.887z M37.877,46.177l-0.533,0.309l0.05,5.023
						c0,0.157-0.058,0.259-0.092,0.295l-3.715,0.013c-0.028-0.019-0.105-0.126-0.105-0.308v-3.417l-1.227,0.286
						c-3.586,0.834-7.088,0.759-10.471-0.128l-1.254-0.328V51.4c0,0.183-0.078,0.29-0.051,0.296l-3.755,0.013
						c-0.028-0.019-0.106-0.126-0.106-0.309l-0.002-4.336l0.181-0.835l-0.599-0.371c-1.983-1.231-3.659-2.749-4.981-4.51l-0.3-0.399H5.5
						c-0.607,0-1.102-0.494-1.102-1.103v-8.936c0-0.608,0.494-1.103,1.102-1.103h2.718l0.168-0.793c0.495-2.345,1.527-4.525,3.068-6.482
						l0.474-0.603l-2.229-2.988c0.987-0.24,2.279,0.053,3.456,0.795l0.604,0.381l0.556-0.447c1.945-1.563,4.271-2.775,6.762-3.529
						c0.022,0.026,0.05,0.049,0.072,0.075c0.152,0.17,0.311,0.335,0.478,0.492c0.042,0.04,0.086,0.078,0.129,0.117
						c0.166,0.15,0.337,0.293,0.515,0.429c0.043,0.032,0.085,0.064,0.128,0.096c0.076,0.056,0.149,0.117,0.228,0.17
						c-1.312,0.332-2.58,0.797-3.768,1.4c-0.493,0.25-0.688,0.852-0.438,1.344c0.25,0.494,0.852,0.69,1.344,0.439
						c2.279-1.158,4.887-1.77,7.538-1.77c2.793,0,5.521,0.675,7.885,1.952c0.151,0.082,0.314,0.12,0.475,0.12
						c0.355,0,0.7-0.189,0.881-0.524c0.263-0.486,0.081-1.093-0.404-1.355c-1.386-0.748-2.881-1.308-4.437-1.676
						c0.049-0.035,0.096-0.073,0.145-0.108c0.068-0.051,0.137-0.101,0.203-0.152c0.155-0.122,0.304-0.25,0.449-0.383
						c0.062-0.056,0.124-0.109,0.184-0.166c0.159-0.155,0.311-0.317,0.457-0.485c0.03-0.034,0.064-0.064,0.094-0.1
						c7.873,2.237,13.317,8.751,13.317,16.037C46.549,37.772,43.308,43.037,37.877,46.177z M51.304,29.612
						c-0.061,0.076-0.14,0.151-0.242,0.153c-0.178-0.027-0.486-0.106-0.553-0.345c-0.043-0.151,0.018-0.338,0.122-0.428
						c0.059-0.028,0.148-0.041,0.263-0.041c0.176,0,0.407,0.03,0.658,0.081C51.501,29.265,51.412,29.472,51.304,29.612z M16.188,28.765
						c0,0.919-0.745,1.664-1.664,1.664s-1.664-0.745-1.664-1.664s0.745-1.664,1.664-1.664S16.188,27.846,16.188,28.765z"/>
					</svg>
				</button>
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