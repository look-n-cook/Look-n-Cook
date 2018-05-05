import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Recipes } from '/imports/api/recipe/recipe';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class RecipeItemAdmin extends React.Component {
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
      Recipes.remove(this.props.recipe._id, this.deleteCallback);
    }
  }
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.recipe.name}</Table.Cell>
          <Table.Cell>{this.props.recipe.owner}</Table.Cell>
          <Table.Cell>{this.props.recipe.createdAt.toLocaleDateString('en-US')}</Table.Cell>
          <Table.Cell>
            <Button icon='trash outline' onClick={this.onClick} />
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RecipeItemAdmin.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItemAdmin;
