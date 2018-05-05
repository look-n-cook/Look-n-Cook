import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendor/vendor.js';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Vendors', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('VendorList', function publish() {
  return Vendors.find();
});

Meteor.methods({
  createVendor: function (userData) {
    const id = Accounts.createUser(userData);
    Roles.addUsersToRoles(id, ['vendor']);
  },
});

