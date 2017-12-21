import React, { Component } from 'react';
import Flickity from 'flickity';
import Header from '../header/Header';
import Graphs from '../graphs/Graphs';
import Footer from '../footer/Footer';
import Service from '../service/Service';
import PostSolution from '../postSolution/PostSolution';

export default class Dashboard extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		selectedIndex: 0,
      burgerClasses: 'burger',
      serviceClasses: 'service',
      sliderClasses: 'slider',
      footerClasses: 'footer',
      postSolutionClasses: 'post-solution',
      currentIssueId: ''
  	}
  	this.flkty = null;
  }

  init = () => {
  	const carousel = document.getElementById('slider');
    const options = {
      cellSelector: '.slide',
      setGallerySize: false,
      asNavFor: '.title-slider',
      contain: true,
      initialIndex: 0,
      accessibility: true,
      prevNextButtons: false,
      pageDots: false,
      selectedAttraction: 0.2,
      friction: 0.7
    }
    this.flkty = new Flickity(carousel, options);
    this.flkty.on('cellSelect', this.updateSelected);
    this.setState({selectedIndex: 0});
  }

  componentWillUnmount = () => {
    if (this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected);
      this.flkty.destroy();
    }
  }

  updateSelected = () => {
    const index = this.flkty.selectedIndex;
    this.setState({ selectedIndex: index });
  }

  toggleMenu = () => {
    if(this.state.postSolutionClasses === 'post-solution post-solution-show') {
      this.setState({
        burgerClasses: 'burger burger-x', 
        postSolutionClasses: 'post-solution',
        serviceClasses: 'service service-show'
      });
    } else {
      this.setState(prevState => {
        return {
          burgerClasses: prevState.burgerClasses === 'burger' ?
                         'burger burger-x' :
                         'burger',
          serviceClasses: 'service',
          sliderClasses: 'slider',
          footerClasses: 'footer',
          postSolutionClasses: 'post-solution'
        }
      });
    }
  }

  showService = () => {
    this.setState({
      burgerClasses: 'burger burger-x',
      serviceClasses: 'service service-show',
      sliderClasses: 'slider slider-move',
      footerClasses: 'footer footer-move'
    });
  }

  solve = (e) => {
    this.setState({
      currentIssueId: e.target.dataset.id,
      burgerClasses: 'burger burger-x burger-arrow',
      postSolutionClasses: 'post-solution post-solution-show',
      serviceClasses: 'service service-show service-up'
    });
  }

  render = () => {
    return (
    	<section 
    		className="dashboard" 
    		style={{ height: `${this.props.height}px` }}>
    		<div>
   				<Header 
            classes={this.state.burgerClasses}
            toggleMenu={this.toggleMenu} />
    			<div 
    				className={this.state.sliderClasses} 
    				id="slider" 
    				style={{ height: `${this.props.height - 155}px` }}>
    				{
    					this.props.properties.map((prop, i) => {
    						return(
    							<div className='slide' key={i}>
    								<Graphs
    									index={i}
	    								height={this.props.height}
	    								length={this.props.properties.length - 1}
	    								init={this.init}
	    								active={this.state.selectedIndex === i}
                      payments={this.props.payments.filter(payment => payment.propId === prop._id)}
                      issues={this.props.issues.filter(issue => issue.propId === prop._id)}
                      property={prop}
                      showService={this.showService} />
    							</div>
    						);
    					})
    				}
    			</div>
          
    			{
            this.props.properties.length > 0 &&
            <Footer
              classes={this.state.footerClasses}
              selectedIndex={this.state.selectedIndex}
              properties={this.props.properties} />
          }
    		</div>

        {
          this.props.properties.length > 0 &&
          <Service
            classes={this.state.serviceClasses}
            height={this.props.height}
            issues={this.props.issues.filter(issue => issue.propId === this.props.properties[this.state.selectedIndex]._id)}
            solve={this.solve} />
        }

        {
          this.props.properties.length > 0 &&
          <PostSolution
            classes={this.state.postSolutionClasses}
            issue={this.props.issues.filter(issue => issue._id === this.state.currentIssueId)}
            toggleMenu={this.toggleMenu} />
        }

    	</section>  
    );
  }
}
