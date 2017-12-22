import React, { Component } from 'react';
import Flickity from 'flickity';
import Header from '../header/Header';
import Graphs from '../graphs/Graphs';
import Footer from '../footer/Footer';
import Service from '../service/Service';
import PostSolution from '../postSolution/PostSolution';
import ServiceImages from '../serviceImages/ServiceImages';
import Rent from '../rent/Rent';
import Chat from '../chat/Chat';
import AddService from '../addService/AddService';
import { checkDate } from '../../../helpers/helpers';

export default class Dashboard extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		selectedIndex: 0,
      headerClasses: 'header',
      burgerClasses: 'burger',
      serviceClasses: 'service',
      rentClasses: 'rent',
      sliderClasses: 'slider',
      footerClasses: 'footer',
      postSolutionClasses: 'post-solution',
      serviceImagesClasses: 'service-images',
      addServiceClasses: 'add-service',
      chatClasses: 'chat',
      currentIssueId: '',
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
    } else if(this.state.serviceImagesClasses === 'service-images service-images-show') {
      this.setState({
        burgerClasses: 'burger burger-x', 
        serviceImagesClasses: 'service-images',
        serviceClasses: 'service service-show'
      });
    } else {
      this.setState(prevState => {
        return {
          burgerClasses: prevState.burgerClasses === 'burger' ?
                         'burger burger-x' :
                         'burger',
          headerClasses: 'header',
          serviceClasses: 'service',
          addServiceClasses: 'add-service',
          rentClasses: 'rent',
          sliderClasses: 'slider',
          footerClasses: 'footer',
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

  showAddService = () => {
    this.setState({
      burgerClasses: 'burger burger-x',
      addServiceClasses: 'add-service add-service-show',
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

  showImages = (e) => {
    this.setState({
      currentIssueId: e.target.dataset.id,
      burgerClasses: 'burger burger-x burger-arrow',
      serviceImagesClasses: 'service-images service-images-show',
      serviceClasses: 'service service-show service-up'
    });
  }

  showRent = () => {
    this.setState({
      burgerClasses: 'burger burger-x',
      rentClasses: 'rent rent-show',
      sliderClasses: 'slider slider-move',
      footerClasses: 'footer footer-move'
    });
  }

  toggleChat = () => {
    this.setState(prevState => {
      return {
        headerClasses: prevState.headerClasses === 'header header-hide-chat' ?
                     'header' : 'header header-hide-chat',
        chatClasses: prevState.chatClasses === 'chat chat-show' ? 
                   'chat' : 'chat chat-show',
      }
    });
  }

  render = () => {
    return (
    	<section 
    		className="dashboard" 
    		style={{ height: `${this.props.height}px` }}>
    		<div>
   				<Header 
            classes={this.state.headerClasses}
            burgerClasses={this.state.burgerClasses}
            toggleMenu={this.toggleMenu}
            toggleChat={this.toggleChat}
            showAddService={this.showAddService} />
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
                      showService={this.showService}
                      showRent={this.showRent} />
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
            solve={this.solve}
            showImages={this.showImages} />
        }

        {
          this.props.properties.length > 0 &&
          <Rent
            classes={this.state.rentClasses}
            payments={this.props.payments.filter(payment => payment.propId === this.props.properties[this.state.selectedIndex]._id && checkDate(payment.date))}
            property={this.props.properties[this.state.selectedIndex]}
            toggleMenu={this.toggleMenu} />
        }

        {
          this.props.properties.length > 0 &&
          <PostSolution
            classes={this.state.postSolutionClasses}
            issue={this.props.issues.filter(issue => issue._id === this.state.currentIssueId)}
            toggleMenu={this.toggleMenu}
            id={this.state.currentIssueId} />
        }

        {
          this.props.properties.length > 0 &&
          <ServiceImages
            classes={this.state.serviceImagesClasses}
            issue={this.props.issues.filter(issue => issue._id === this.state.currentIssueId)}
            toggleMenu={this.toggleMenu}
            id={this.state.currentIssueId} />
        }

        {
          this.props.properties.length > 0 &&
          <AddService
            classes={this.state.addServiceClasses}
            property={this.props.properties[this.state.selectedIndex]}
            toggleMenu={this.toggleMenu} />
        }

        {
          this.props.conversations.length > 0 &&
          <Chat
            classes={this.state.chatClasses} 
            messages={this.props.messages}
            conversations={this.props.conversations}
            toggleChat={this.toggleChat} />
        }

    	</section>  
    );
  }
}
