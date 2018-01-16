import React, { Component } from 'react';
import Flickity from 'flickity';
import Header from '../header/Header';
import Graphs from '../graphs/Graphs';
import Footer from '../footer/Footer';
import Service from '../service/Service';
import PostSolution from '../postSolution/PostSolution';
import ServiceImages from '../serviceImages/ServiceImages';
import Chat from '../chat/Chat';
import AddService from '../addService/AddService';
import CollectPay from '../collectPay/CollectPay';
import HistoricalData from '../historicalData/HistoricalData';
import Paybill from '../paybill/Paybill';
import Menu from '../menu/Menu';
import { checkDate } from '../../../helpers/helpers';

export default class Dashboard extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		selectedIndex: 0,
      headerClasses: 'header',
      headerText: ['Rent', '#5BDC70'],
      burgerClasses: 'burger',
      serviceClasses: 'service',
      rentClasses: 'rent',
      expensesClasses: 'expenses',
      sliderClasses: 'slider',
      footerClasses: 'footer',
      postSolutionClasses: 'post-solution',
      serviceImagesClasses: 'service-images',
      addServiceClasses: 'add-service',
      collectPayClasses: 'collect-pay',
      paybillClasses: 'paybill',
      chatClasses: 'chat',
      currentIssueId: '',
      menuClasses: 'menu'
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
    };
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
        serviceClasses: 'service service-show',
        headerClasses: 'header header-show-addservice',
      });
    } else if(this.state.serviceImagesClasses === 'service-images service-images-show') {
      this.setState({
        burgerClasses: 'burger burger-x', 
        serviceImagesClasses: 'service-images',
        serviceClasses: 'service service-show',
        headerClasses: 'header header-show-addservice',
      });
    } else if(this.state.paybillClasses === 'paybill paybill-show') {
      this.setState({
        burgerClasses: 'burger burger-x', 
        paybillClasses: 'paybill',
        expensesClasses: 'expenses expenses-show',
        headerClasses: 'header header-show-paybill',
      });
    } else if(this.state.serviceClasses === 'service service-show service-up') {
      this.setState({
        burgerClasses: 'burger burger-x', 
        serviceClasses: 'service service-show',
        addServiceClasses: 'add-service',
        headerClasses: 'header header-show-addservice'
      });
    } else if(this.state.rentClasses === 'rent rent-show rent-move') {
      this.setState({
        burgerClasses: 'burger burger-x',
        rentClasses: 'rent rent-show',
        collectPayClasses: 'collect-pay',
        headerClasses: 'header header-show-collectrent'
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
          expensesClasses: 'expenses',
          collectPayClasses: 'collect-pay',
          sliderClasses: prevState.burgerClasses === 'burger' ? 'slider slider-move' : 'slider',
          footerClasses: prevState.burgerClasses === 'burger' ? 'footer footer-move' : 'footer',
          menuClasses: prevState.burgerClasses === 'burger' ? 'menu menu-show' : 'menu'
        }
      });
    }
  }

  showService = () => {
    this.setState({
      burgerClasses: 'burger burger-x',
      serviceClasses: 'service service-show',
      sliderClasses: 'slider slider-move',
      footerClasses: 'footer footer-move',
      headerClasses: 'header header-show-addservice',
    });
  }

  showAddService = () => {
    this.setState(prevState => {
      return {
        burgerClasses: prevState.serviceClasses === 'service service-show' ? 'burger burger-x burger-arrow' : 'burger burger-x',
        addServiceClasses: 'add-service add-service-show',
        menuClasses: 'menu',
        serviceClasses: prevState.serviceClasses === 'service service-show' ? 'service service-show service-up' : 'service',
        sliderClasses: 'slider slider-move',
        footerClasses: 'footer footer-move',
        headerClasses: 'header header-hide-center',
        headerText: ['Service', '#F66463']
      }
    });
  }

  solve = (e) => {
    this.setState({
      currentIssueId: e.target.dataset.id,
      burgerClasses: 'burger burger-x burger-arrow',
      postSolutionClasses: 'post-solution post-solution-show',
      serviceClasses: 'service service-show service-up',
      headerClasses: 'header header-hide-center',
      headerText: ['Service', '#F66463']
    });
  }

  paybill = (e) => {
    this.setState({
      burgerClasses: 'burger burger-x burger-arrow',
      paybillClasses: 'paybill paybill-show',
      menuClasses: 'menu',
      expensesClasses: 'expenses expenses-show expenses-hide',
      headerClasses: 'header header-hide-center',
      headerText: ['Expenses', '#91A7E0']
    });
  }

  showImages = (e) => {
    this.setState({
      currentIssueId: e.target.dataset.id,
      burgerClasses: 'burger burger-x burger-arrow',
      serviceImagesClasses: 'service-images service-images-show',
      serviceClasses: 'service service-show service-up',
      headerClasses: 'header header-hide-center',
      headerText: ['Service', '#F66463']
    });
  }

  showRent = () => {
    this.setState({
      burgerClasses: 'burger burger-x',
      rentClasses: 'rent rent-show',
      sliderClasses: 'slider slider-move',
      footerClasses: 'footer footer-move',
      headerClasses: 'header header-show-collectrent',
    });
  }

  showExpenses = () => {
    this.setState({
      burgerClasses: 'burger burger-x',
      expensesClasses: 'expenses expenses-show',
      sliderClasses: 'slider slider-move',
      footerClasses: 'footer footer-move',
      headerClasses: 'header header-show-paybill',
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

  collectPayShow = () => {
    this.setState(prevState => {
      return {
        burgerClasses: prevState.rentClasses === 'rent rent-show' ? 'burger burger-x burger-arrow' : 'burger burger-x',
        collectPayClasses: 'collect-pay collect-pay-show',
        menuClasses: 'menu',
        sliderClasses: 'slider slider-move',
        footerClasses: 'footer footer-move',
        headerClasses: 'header header-hide-center',
        headerText: ['Rent', '#11ffbd'],
        rentClasses: prevState.rentClasses === 'rent rent-show' ? 'rent rent-show rent-move' : 'rent',
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
            headerText={this.state.headerText}
            burgerClasses={this.state.burgerClasses}
            toggleMenu={this.toggleMenu}
            toggleChat={this.toggleChat}
            showAddService={this.showAddService}
            collectPayShow={this.collectPayShow}
            paybill={this.paybill}
            addService={this.showAddService}
            collectRent={this.collectPayShow} />
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
                      showRent={this.showRent}
                      showExpenses={this.showExpenses} />
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
          <CollectPay 
            classes={this.state.collectPayClasses}
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
          this.props.properties.length > 0 &&
          <HistoricalData
            classes={this.state.expensesClasses}
            data={this.props.issues.filter(issue => issue.propId === this.props.properties[this.state.selectedIndex]._id && issue.solution.completed)}
            property={this.props.properties[this.state.selectedIndex]}
            for='expenses'
            title='Recorded Expenses' />
        }

        {
          this.props.properties.length > 0 &&
          <HistoricalData
            classes={this.state.rentClasses}
            data={this.props.payments.filter(payment => payment.propId === this.props.properties[this.state.selectedIndex]._id)}
            property={this.props.properties[this.state.selectedIndex]}
            for='rent'
            title='Rent Payments' />
        }

        {
          this.props.properties.length > 0 &&
          <Paybill 
            classes={this.state.paybillClasses}
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

        <Menu 
          classes={this.state.menuClasses}
          collectRent={this.collectPayShow}
          addService={this.showAddService}
          paybill={this.paybill} />

    	</section>  
    );
  }
}
