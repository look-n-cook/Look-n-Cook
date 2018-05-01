import React from 'react';
import { Card, Image, Feed, Grid, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserHomeRecipes extends React.Component {
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
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
UserHomeRecipes.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserHomeRecipes);
