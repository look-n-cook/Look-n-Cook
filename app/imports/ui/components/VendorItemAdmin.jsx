import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class VendorItemAdmin extends React.Component {
  render() {
    const ingredientOwners = _.map(this.props.ingredients, (ingredient) => ingredient.owner);
    console.log(ingredientOwners);
    return (
        <Table.Row>
          <Table.Cell>{this.props.vendor.emails['0'].address}</Table.Cell>
          <Table.Cell>{
            (_.filter(ingredientOwners, (owner) => owner === this.props.vendor.emails['0'].address)).length
          }</Table.Cell>
          <Table.Cell>{this.props.vendor.createdAt.toLocaleDateString('en-US')}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
VendorItemAdmin.propTypes = {
  vendor: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default VendorItemAdmin;
