import { Meteor } from 'meteor/meteor';
import { Ingredients } from '../../api/ingredient/ingredient.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Ingredients', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ingredients.find({ owner: username });
  }
  return this.ready();
});
