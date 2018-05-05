import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Vendors } from '/imports/api/vendor/vendor';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class IngredientItemAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
  }
  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  /** On remove, delete the data. */
  onClick() {
    /* eslint-disable-next-line */
    if (confirm("Do you really want to remove this ingredient?")) {
      Vendors.remove(this.props.ingredient._id, this.deleteCallback);
    }
  }
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.ingredient.name}</Table.Cell>
          <Table.Cell>{this.props.ingredient.owner}</Table.Cell>
          <Table.Cell>{`$${this.props.ingredient.price.toFixed(2)}`}</Table.Cell>
          <Table.Cell>{this.props.ingredient.quantity}</Table.Cell>
          <Table.Cell>
            <Button icon='trash outline' onClick={this.onClick} />
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IngredientItemAdmin.propTypes = {
  ingredient: PropTypes.object.isRequired,
};


export default IngredientItemAdmin;
