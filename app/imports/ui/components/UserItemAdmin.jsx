import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class RecipeItemAdmin extends React.Component {
  render() {
    const recipeOwners = _.map(this.props.recipes, (recipe) => recipe.owner);
    const count = _.countBy(recipeOwners, (username) => username);
    return (
        <Table.Row>
          <Table.Cell>{this.props.user}</Table.Cell>
          <Table.Cell>{count[this.props.user]}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RecipeItemAdmin.propTypes = {
  user: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired,
};

export default RecipeItemAdmin;
