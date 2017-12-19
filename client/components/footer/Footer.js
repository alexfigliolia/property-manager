import React, { Component } from 'react';
import Flickity from 'flickity';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.flkty = null;
  }

  componentDidMount() {
  	const options = {
  		cellSelector: '.title',
      initialIndex: 0,
      prevNextButtons: false,
      pageDots: false,
      draggable: false,
      selectedAttraction: 0.28,
      friction: 0.7
  	};
  	setTimeout(() => {
  		this.flkty = new Flickity(this.refs.fs, options);
  	}, 100);
  }

  componentWillReceiveProps = (nextProps) => {
  	if(this.flkty) this.flkty.select( nextProps.selectedIndex );
  }

  componentWillUnmount = () => {
    if (this.flkty) this.flkty.destroy();
  }

  render = () => {
    return (
      <footer className={this.props.classes}>
				<div>
					<div className="title-slider" ref='fs'>
						{
							this.props.properties.map((prop, i) => {
								return (
									<div key={i} className="title">
										<h1>{prop.property}</h1>
									</div>
								);
							})
						}
					</div>
{/*					<div className="foot">
						<button>go</button>
					</div>*/}
				</div>
			</footer>
    );
  }
}