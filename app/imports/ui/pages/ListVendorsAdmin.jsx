import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import { Accounts } from '/imports/api/accounts/accounts';
import VendorItemAdmin from '/imports/ui/components/VendorItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListIngredientsAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.readyAccounts && this.props.readyIngredients) ?
        this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const vendors = _.filter(
        (this.props.accounts),
        (account) => _.contains((account.roles), 'vendor'),
    );

    console.log(vendors);

    return (
        <Container>
          <Header as="h2" textAlign="center">List Users</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Vendor</Table.HeaderCell>
                <Table.HeaderCell># Products</Table.HeaderCell>
                <Table.HeaderCell>Joined On</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {vendors.map((vendor) => <VendorItemAdmin
                  key={vendor._id} vendor={vendor} ingredients={this.props.ingredients}/>)
              }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListIngredientsAdmin.propTypes = {
  accounts: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  readyIngredients: PropTypes.bool.isRequired,
  readyAccounts: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionIngredients = Meteor.subscribe('VendorList');
  const subscriptionAccounts = Meteor.subscribe('AccountsAdmin');
  return {
    accounts: Accounts.find({}).fetch(),
    ingredients: Vendors.find({}).fetch(),
    readyIngredients: subscriptionIngredients.ready(),
    readyAccounts: subscriptionAccounts.ready(),
  };
})(ListIngredientsAdmin);
