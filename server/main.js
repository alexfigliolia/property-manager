import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import './PublishData';
import { Properties, Issues, Payments, Conversations, Messages, GroupAccounts } from '../api/collections.js';

Meteor.methods({

  'users.get'(arr) {
    check(arr, Array);
    if(arr.length === 0) return [];
    const objs = Meteor.users.find(
      { _id: { $in: arr } }, 
      {fields: {name: 1, _id: 1 }}
    ).fetch();
    return objs;
  },

	'groupAccount.find'(name, pw, manager){
		check(name, String);
		check(pw, String);
		check(manager, String);
		const gc = GroupAccounts.find({group: name, password: pw, managerNames: manager}).fetch();
		if(gc.length > 0) {
			return gc;
		} else {
			return false;
		}
	},

	'convos.mesh'(owner) {
		check(owner, String);
		const exists = Meteor.users.find({_id: Meteor.userId()}).fetch();
		if('_id' in exists[0] && 'groupId' in exists[0]) {
			Conversations.update({$and: [{owners: owner}, {type: 'group'}]}, {
				$push: { owners: Meteor.userId() }
			});
			const usersInGroup = Meteor.users.find({groupId: exists[0].groupId});
			usersInGroup.forEach(guy => {
				if(guy._id !== Meteor.userId()) {
					Conversations.insert({
						owners: [Meteor.userId(), guy._id],
						type: 'private'
					});
				}
 			});
		} else {
			return 'Cannot get user account';
		}
	},

	'users.checkIfOwner'(e){
		const user = Accounts.findUserByEmail(e);
		if(user === undefined) return false;
		if('roll' in user) {
			return user.roll === 'owner';
		} else {
			return true;
		}
	},

	'issues.create'(id, prop, obj){
    check(id, String);
    check(prop, String);
    check(obj, Object);
    return Issues.insert({
      propId: id,
      property: prop,
      issue: obj.issue,
      date: new Date(),
      images: obj.images,
      postedBy: Meteor.user().name,
      solved: obj.solved,
      solution: {
        completed: obj.solution.completed,
        description: obj.solution.description,
        products: obj.solution.products,
        budget: obj.solution.budget,
        spent: obj.solution.spent,
        postedBy: Meteor.user().name
      }
    });
  },

  'issue.postSolution'(id, solution) {
    check(id, String);
    check(solution.budget, Number);
    return Issues.update({ _id: id }, {
      $set: {
        solved: true,
        'solution.description': solution.description,
        'solution.products': solution.products,
        'solution.budget': solution.budget,
        'solution.postedBy': Meteor.user().name
      }
    });
  },

  'issue.markComplete'(id, amt) {
    check(id, String);
    check(amt, Number);
    return Issues.update({ _id: id }, {
      $set: {
        date: new Date(),
        'solution.completed': true,
        'solution.spent': amt
      }
    });
  },

  'issue.addImage'(id, img) {
    check(id, String);
    check(img, String);
    return Issues.update( { _id: id }, { $push: { images: img } } );
  },

  'issue.delete'(id) {
    check(id, String);
    return Issues.remove({_id: id});
  },

  'payments.create'(id, amount) {
    check(id, String);
    check(amount, Number);
    return Payments.insert({
      propId: id, 
      payment: amount, 
      date: new Date()
    });
  },

  'messages.send'(sentFrom, to, text, convoId) {
    check(sentFrom, Object);
    check(to, Object);
    check(text, String);
    check(convoId, String);
    let sentTo;
    if('name' in to) { sentTo = to } else { sentTo = 'group' }
    return Messages.insert({
      from: sentFrom,
      to: sentTo,
      text: text,
      date: new Date(),
      conversation: convoId
    })
  },


});