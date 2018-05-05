import React from 'react';
import { Table, Button, } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Vendors } from '/imports/api/vendor/vendor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IngredientItem extends React.Component {

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
      Vendors.remove(this.props.vendor._id, this.deleteCallback);
    }
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.vendor.name}</Table.Cell>
          <Table.Cell>{this.props.vendor.quantity}</Table.Cell>
          <Table.Cell>${this.props.vendor.price.toFixed(2)}</Table.Cell>
          <Table.Cell>{this.props.vendor.owner}</Table.Cell>
          <Table.Cell>{this.props.vendor.createdAt.toLocaleDateString('en-US')}</Table.Cell>
          <Table.Cell>
            <Button.Group basic size='small'>
              <Button icon='edit' as={NavLink} exact to={`/vendor-edit/${this.props.vendor._id}`}/>
              <Button icon='trash outline' onClick={this.onClick} />
            </Button.Group>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IngredientItem.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IngredientItem);
