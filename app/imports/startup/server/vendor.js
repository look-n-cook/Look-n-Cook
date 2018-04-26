import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendor/vendor.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Vendors', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.find({ owner: username });
  }
  return this.ready();
});
