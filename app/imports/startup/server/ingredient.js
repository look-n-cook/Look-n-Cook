import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Ingredients } from '../../api/ingredient/ingredient.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Notes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ingredients.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('Admin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Ingredients.find();
  }
  return this.ready();
});
