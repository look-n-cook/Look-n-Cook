import React from 'react';
import { Card, Image, Button, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Recipes } from '/imports/api/recipe/recipe';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {

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
    if (confirm("Do you really want to delete this recipe?")) {
      Recipes.remove(this.props.recipe._id, this.deleteCallback);
    }
  }


  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.recipe.image} />
          <Card.Header>
            {this.props.recipe.name}
          </Card.Header>
          <Card.Description>
            {this.props.recipe.ingredients}
          </Card.Description>
          <Card.Description>
            {this.props.recipe.steps}
          </Card.Description>
          <Feed.Date content={this.props.recipe.createdAt.toLocaleDateString('en-US')} />
          <Card.Content extra>
            <Link to={`/edit/${this.props.recipe._id}`}>Edit</Link>
          </Card.Content>
        </Card.Content>
        <Card.Content extra>
          <Button basic onClick={this.onClick}>Delete</Button>
        </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Recipe);
