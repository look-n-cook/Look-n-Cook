import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class IngredientItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.ingredient.name}</Table.Cell>
          <Table.Cell>{this.props.ingredient.owner}</Table.Cell>
          <Table.Cell>{this.props.ingredient.price}</Table.Cell>
          <Table.Cell>{this.props.ingredient.quantity}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IngredientItemAdmin.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default IngredientItemAdmin;
