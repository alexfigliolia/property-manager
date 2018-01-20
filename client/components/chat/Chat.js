import React, { Component } from 'react';

export default class Chat extends Component {
  constructor(props) {
  	super(props);
  	this.state = { 
  		contactsClasses: "m-list",
      messagesClasses: 'messages',
      sendersClasses: 'sender',
  		currentChat: {name: 'Group'},
  		text: '',
  		conversation: this.props.conversations[0],
  		senderClasses: 's-button',
      managers: [],
  	}
  }

  componentDidMount = () => {
		this.setState({ conversation: this.props.conversations[0], currentChat: {name: 'Group'}});
		setTimeout(() => {
  		this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  	}, 200);
  }

  componentWillReceiveProps = (nextProps) => {
  	setTimeout(() => {
  		this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  	}, 100);
    if(nextProps.conversations.length > 0 && nextProps.conversations !== this.props.conversations) {
      this.getGroup(nextProps.conversations);
    }
    if(nextProps.classes === 'chat chat-show' &&
      nextProps.classes !== this.props.classes) {
      this.removeNoties();
    }
  }

  getGroup = (convos) => {
    const peops = [];
    convos.forEach(convo => {
      convo.owners.forEach(dude => {
        if(peops.indexOf(dude) === -1 && dude !== Meteor.userId()) {
          peops.push(dude);
        }
      });
    });
    Meteor.call('users.get', peops, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        this.setState({ managers: res });
      }
    })
  }

  toggleContacts = () => {
  	this.setState(prevState => {
  		const ns = prevState.contactsClasses === 'm-list' ? 'm-list m-list-show' : 'm-list';
      const sc = prevState.sendersClasses === 'sender' ? 'sender sender-move' : 'sender';
      const mc = prevState.messagesClasses === 'messages' ? 'messages messages-move' : 'messages';
  		return { contactsClasses: ns, messagesClasses: mc, sendersClasses: sc }
  	});
  }

  changeChat = (e) => {
    const { chat, id } = e.target.dataset;
  	let convo;
  	if(chat === 'Group') {
  		convo = this.props.conversations.filter(con => con.type === 'group');
      this.setState({
        currentChat: {name: 'Group'},
        conversation: convo[0]
      }, this.closeDrawer);
  	} else {
  		convo = this.props.conversations.filter(con => {
  			return con.type !== 'group' && 
  						 con.owners.indexOf(Meteor.userId()) !== -1 &&
  						 con.owners.indexOf(id) !== -1
  		});
      this.setState({
        currentChat: {name: chat, _id: id},
        conversation: convo[0]
      }, this.closeDrawer);
  	}
    setTimeout(() => {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
    }, 100);
  }

  closeDrawer = () => {
    this.toggleContacts();
    this.removeNoties();
  }

  sendMessage = () => {
  	if(this.state.text !== '') {
      const to = this.state.conversation.type === 'group' ? {} : this.state.currentChat;
  		Meteor.call('messages.send', {_id: Meteor.userId(), name: Meteor.user().name}, to, this.state.text, this.state.conversation._id, (err, res) => {
	  		if(err) { console.log(err) } else { this.setState({ text: '' }, this.removeNoties) }
	  	});
	  	this.fly();
  	}
  }

  fly = () => {
  	this.setState({senderClasses: 's-button fly1'});
  	setTimeout(() => {
  		this.setState({senderClasses: 's-button fly1 fly2'});
  	}, 300);
  	setTimeout(() => {
  		this.setState({senderClasses: 's-button fly1 fly2 fly3'});
  	}, 350);
  	setTimeout(() => {
  		this.setState({senderClasses: 's-button'});
  	}, 650);
  }

  getUnread = (id, type) => {
    let num = 0
    if(type === 'group') {
      const convo = this.props.conversations.filter(convo => convo.type === 'group');
      if(convo.length) {
        for(let i = 0; i<this.props.unread.length; i++) {
          if(this.props.unread[i] === convo[0]._id) num++;
        }
      }
    } else {
      const convo = this.props.conversations.filter(convo => convo.type !== 'group' && convo.owners.indexOf(id) !== -1);
      if(convo.length) {
        for(let i = 0; i<this.props.unread.length; i++) {
          if(this.props.unread[i] ===  convo[0]._id) num++
        }
      } 
    }
    return num;
  }

  removeNoties = () => {
    Meteor.call('user.removeNew', this.state.conversation._id, (err, res) => {
      if(err) console.log(err);
    });
  }

  render = () => {
    const g = this.getUnread('farts', 'group');
    return (
    	<section className={this.props.classes}>
    		<div>
    			<header className="chat-header">
    				<div>
    					<button
    						onClick={this.toggleContacts}>
                {
                  this.props.unread.length > 0 &&
                  <div className='indic'>{this.props.unread.length}</div>
                }
              </button>
    					<h3>{this.state.currentChat === 'Group' ? 'Group' : this.state.currentChat.name}</h3>
    					<button
    						onClick={this.props.toggleChat}></button>
    				</div>
    			</header>
    			<div className={this.state.messagesClasses} ref="messages">
    				<div>
    					{
    						this.state.conversation &&
    						this.props.messages.filter(message => {
    							return message.conversation === this.state.conversation._id
    						})
    						.map((message, i) => {
                  if(this.state.currentChat.name === 'Group') {
                    return(
                      <div 
                        key={i} 
                        className={message.from._id === Meteor.userId() ? "message mine" : "message"}>
                        {message.from.name}:<br/>{message.text}
                      </div>
                    );
                  } else {
                    return(
                      <div 
                        key={i} 
                        className={message.from._id === Meteor.userId() ? "message mine" : "message"}>
                        { message.text }
                      </div>
                    );
                  }
    						})
    					}
    				</div>
    			</div>
    			<div className={this.state.sendersClasses}>
    				<textarea
    					onChange={(e) => {this.setState({ text: e.target.value})}} 
    					placeholder="Message"
    					value={this.state.text}></textarea>
    				<button onClick={this.sendMessage} className={this.state.senderClasses}>
    					<img src="send.svg" alt="send message" />
    				</button>
    			</div>
    			<div className={this.state.contactsClasses}>
    				<div>
    					<div className="contact-list-header">Contacts</div>
    					<div
    						data-chat='Group' 
    						className='manager-contact mc-group'
    						onClick={this.changeChat}
                style={{
                  background: g > 0 ? '#fff' : 'transparent'
                }}>
                Group
                {
                  g > 0 &&
                  <div className='indic'>{g}</div>
                }
              </div>
    					{
    						this.state.managers.map((guy, i) => {
                  const num = this.getUnread(guy._id, 'private');
    							return (
    								<div 
    									key={i} 
    									data-chat={guy.name}
                      data-id={guy._id}
    									className='manager-contact'
    									onClick={this.changeChat}
                      style={{
                        background: num > 0 ? '#fff' : 'transparent'
                      }}>
    									{guy.name}
                      {
                        num > 0 &&
                        <div className='indic'>{num}</div>
                      }
    								</div>
    							);
    						})
    					}
    				</div>
    			</div>
    		</div>
    	</section> 
    );
  }
}
