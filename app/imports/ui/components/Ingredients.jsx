import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Ingredient extends React.Component {
  render() {
    return (
      <Table basic='very' celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{this.props.ingredient.name}</Table.Cell>
            <Table.Cell>{this.props.ingredient.quantity}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

/** Require a document to be passed to this component. */
Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Ingredient);
