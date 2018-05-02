import React from 'react';
import { Card, Image, Button, Feed, Grid, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Recipes } from '/imports/api/recipe/recipe';
import { withRouter, NavLink, Link } from 'react-router-dom';

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
    const cardStyle = {
      background: '#F3E2C4',
    };
    const dietArray = [];
    if (this.props.recipe.vegan === true) { dietArray.push('Vegan'); }
    if (this.props.recipe.glutenFree === true) { dietArray.push('Gluten Free'); }
    if (this.props.recipe.dairyFree === true) { dietArray.push('Dairy Free'); }
    return (
        <Card centered style={cardStyle} link>
          <Card.Content>
            <Card.Header>
              {this.props.recipe.name}
            </Card.Header>
            <div style={{ marginTop: '10px' }}>
              <Link to={`/recipe/${this.props.recipe._id}`}>
                <Image floated='center' height='350px' width='300px' src={this.props.recipe.image}/>
              </Link>
            </div>

            <Card.Description>
              <div style={{ marginTop: '375px', marginBottom: '10px' }}>
                {this.props.recipe.description}
              </div>
            </Card.Description>

            <Grid columns={2} textAlign={'center'}>
              <Grid.Column>
                <Card.Meta>
                  Created By
                </Card.Meta>
                <Feed.Content content={this.props.recipe.owner}/>
              </Grid.Column>
              <Grid.Column>
                <Card.Meta>
                  Added on
                </Card.Meta>
                <Feed.Date content={this.props.recipe.createdAt.toLocaleDateString('en-US')}/>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            <Grid textAlign={'center'}>
              <Menu compact borderless text textAlign={'center'}>
                {dietArray.map((diet, index) => <Menu.Item key={index}>{`${diet}`}</Menu.Item>)}
              </Menu>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            <Grid textAlign={'center'} columns={2}>
            <Grid.Column><Button fluid basic onClick={this.onClick}>Delete</Button></Grid.Column>
            <Grid.Column><Button fluid basic as={NavLink} exact to={`/edit/${this.props.recipe._id}`}>Edit</Button></Grid.Column>
            </Grid>
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
