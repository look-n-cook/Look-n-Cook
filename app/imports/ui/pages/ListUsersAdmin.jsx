import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { Accounts } from '/imports/api/accounts/accounts';
import UserItemAdmin from '/imports/ui/components/UserItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipesAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.readyAccounts && this.props.readyRecipes) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Users</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Recipes Made</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.users.map((user) => <UserItemAdmin
                  key={user._id} user={user} recipes={this.props.recipes} />)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRecipesAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
  readyRecipes: PropTypes.bool.isRequired,
  readyAccounts: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionRecipes = Meteor.subscribe('Admin');
  const subscriptionAccounts = Meteor.subscribe('AccountsAdmin');
  return {
    users: Accounts.find({}).fetch(),
    recipes: Recipes.find({}).fetch(),
    readyRecipes: subscriptionRecipes.ready(),
    readyAccounts: subscriptionAccounts.ready(),
  };
})(ListRecipesAdmin);
