import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'vendor') {
    Roles.addUsersToRoles(userID, 'vendor');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Meteor.publish('AccountsAdmin', function () {
  const self = this;
  const handle = Meteor.users.find({}, {
    fields: { emails: 1, createdAt: 1, roles: 1 },
  }).observeChanges({
    added: function (id, fields) {
      self.added('Accounts', id, fields);
    },
    changed: function (id, fields) {
      self.changed('Accounts', id, fields);
    },
    removed: function (id) {
      self.removed('Accounts', id);
    },
  });

  this.ready();

  this.onStop(function () {
    handle.stop();
  });

});
