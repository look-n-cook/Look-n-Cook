import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class UserItemAdmin extends React.Component {
  render() {
    const recipeOwners = _.map(this.props.recipes, (recipe) => recipe.owner);
    return (
        <Table.Row>
          <Table.Cell>{this.props.user.emails['0'].address}</Table.Cell>
          <Table.Cell>{
            (_.filter(recipeOwners, (owner) => owner === this.props.user.emails['0'].address)).length
          }</Table.Cell>
          <Table.Cell>{this.props.user.createdAt.toLocaleDateString('en-US')}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
UserItemAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
};

export default UserItemAdmin;
