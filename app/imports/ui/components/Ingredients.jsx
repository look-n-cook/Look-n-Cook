import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Ingredients } from '/imports/api/ingredient/ingredient';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Ingredient extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.formRef = null;
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
    if (confirm("Do you really want to delete this ingredient?")) {
      Ingredients.remove(this.props.ingredient._id, this.deleteCallback);
    }
  }

  render() {
    return (
      <Grid columns='equal'>
        <Grid.Column>
            {this.props.ingredient.measurement}
            &nbsp;
            of
            &nbsp;
            {this.props.ingredient.name}
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button basic onClick={this.onClick}>Delete</Button>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Ingredient);
