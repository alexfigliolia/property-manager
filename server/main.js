import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import './PublishData';
import { Properties, Issues, Payments, Conversations, Messages, GroupAccounts } from '../api/collections.js';

Meteor.methods({

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
	}


});