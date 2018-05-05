import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Recipes } from '../../api/recipe/recipe.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Recipes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('Home', function publish() {
    return Recipes.find();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('Admin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.find();
  }
  return this.ready();
});
