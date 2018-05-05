import React from 'react';
import { Table, Label, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class RecipeListVendor extends React.Component {

  render() {
    console.log('ingredient passed');

    const vendorsArray = _.filter(
        (this.props.vendor),
        (vendor) => (this.props.ingredient === vendor.name),
    );

    if (vendorsArray.length === 0) {
      vendorsArray.push({ owner: 'No vendors available', quantity: 'N/A' });
    }

    console.log('RecipeListVendor{');
    console.log('Vendor:');
    console.log(this.props.vendor);
    console.log('Array:');
    console.log(vendorsArray);
    console.log('}');

    const ingredientName = this.props.ingredient;


    return (
        <Table.Row>
          <Table.Cell width={2}>
            <Label ribbon>{ingredientName}</Label>
          </Table.Cell>
          <Table.Cell>
            <List>
              {_.map(
                  (vendorsArray),
                  (ven) => (<List.Item>{ven.owner}</List.Item>),
              )}
            </List>
          </Table.Cell>
          <Table.Cell>
            <List>
              {_.map(
                  (vendorsArray),
                  (ven) => (<List.Item>{ven.quantity}</List.Item>),
              )}
            </List>
          </Table.Cell>
          <Table.Cell>
            <List>
              {_.map(
                  (vendorsArray),
                  (ven) => (<List.Item>{ven.price}</List.Item>),
              )}
            </List>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RecipeListVendor.propTypes = {
  vendor: PropTypes.array.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default RecipeListVendor;
