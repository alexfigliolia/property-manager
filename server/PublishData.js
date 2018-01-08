import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Properties, Issues, Payments, Conversations, Messages, GroupAccounts } from '../api/collections.js';
import { ReactiveVar } from 'meteor/reactive-var';

const convos = new ReactiveVar([]);
const properties = new ReactiveVar([]);
const group = new ReactiveVar({});
const user = new ReactiveVar({});

function updateConvos(val) { convos.set(val) }
function updateProperties(arr) { properties.set(arr) }
function setGroup(val) { group.set(val) }
function setUser(val) { user.set(val) }

Accounts.onCreateUser((options, user) => {
  user.name = options.name;
  user.roll = "manager";
  user.groupId = options.groupId,
  user.groupPassword = options.groupPasswrd;
  user.groupName = options.groupName;
  setUser(user);
  return user;
});

Meteor.publish('userData', function() {
  let currentUser;
  currentUser = this.userId;
  if (currentUser) {
    const thisUser = Meteor.users.find({ _id: currentUser }).fetch();
    if(thisUser.length > 0) setUser(thisUser[0]);
    return Meteor.users.find({
      _id: currentUser
    },
    {
      fields: {
        "name" : 1,
        "groupId": 1,
        "_id": 1
      }
    });
  } else {
    return this.ready();
  }
});

Meteor.publish('properties', function() {
  let currentUser;
  currentUser = this.userId;
  const props = [ Properties.find({group: user.curValue.groupId}, {
     fields: {
        property: 1,
        manager: 1,
        monthRentExpected: 1,
        hasMortgage: 1,
        mortgageMonthly: 1,
        new: 1,
        color: 1,
        color2:1,
        owner: 1,
        _id: 1,
        group: 1
     }})
  ];
  updateProperties(props);
  if ( currentUser ) {
    return props;
  } else {
    return this.ready();
  }
});

Meteor.publish('payments', function() {
  this.autorun(function(computation) {
    let currentUser;
    currentUser = this.userId;
    if (currentUser) {
      const ids = [];
      const props = Properties.find({group: user.curValue.groupId}).fetch();
      props.forEach( prop => ids.push(prop._id) );
      updateProperties(ids);
      let filter = { propId: { $in: properties.curValue } }; 
      return Payments.find(filter, { fields: { propId: 1, payment: 1, label: 1, date: 1 }});
    } else {
      return this.ready();
    }
  });
});

Meteor.publish('issues', function() {
  this.autorun(function(computation) {
    let currentUser;
    currentUser = this.userId;
    if (currentUser) {
      const ids = [];
      const props = Properties.find({group: user.curValue.groupId}).fetch();
      props.forEach( prop => ids.push(prop._id) );
      updateProperties(ids);
      let filter = { propId: { $in: properties.curValue } }; 
      return Issues.find(filter, 
        { 
          fields: { 
            _id: true,
            propId: true,
            property: true,
            issue: true,
            date: true,
            postedBy: true,
            images: true,
            solved: true,
            solution: true
          }
        }
      );
    } else {
      return this.ready();
    }
  });
});

Meteor.publish('groupAccounts', function() {
  let currentUser;
  currentUser = this.userId;
  if (currentUser) {
    return GroupAccounts.find({_id: user.curValue.groupId},
     {
      fields: {
        owner: 1,
        group: 1,
        password: 1,
        invited: 1,
        managerIds: 1,
        managerNames: 1,
        _id: 1
      }
    });
  } else {
    return this.ready();
  }
});

Meteor.publish('conversations', function() {
  let currentUser;
  currentUser = this.userId;
  if(currentUser) {
    const convos = Conversations.find({owners: currentUser}, {
      fields: {
        type: 1,
        owners: 1,
        _id: 1
      }
    });
    return convos;
  } else {
    return this.ready();
  }
});

Meteor.publish('messages', function() {
  this.autorun(function(computation) {
    let currentUser;
    currentUser = this.userId;
    if(currentUser) {
      const cs = Conversations.find({owners: currentUser}).fetch();
      let chatIds = [];
      for(let i = 0; i<cs.length; i++) {
        chatIds.push(cs[i]._id);
      }
      updateConvos(chatIds);
      const messages = Messages.find({conversation: {$in: convos.curValue}},{
        fields: {
          from: 1,
          to: 1,
          text: 1,
          date: 1,
          conversation: 1
        }
      });
      return messages;
    } else {
      return this.ready();
    }
  });
});