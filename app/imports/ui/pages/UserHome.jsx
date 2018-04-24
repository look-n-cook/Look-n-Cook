import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import UserHomeRecipes from '/imports/ui/components/UserHomeRecipes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sortedByDate = _.sortBy(this.props.recipes, 'createdAt');
    const reversed = sortedByDate.reverse();
    const newest = reversed.slice(0, 6);
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>User Home Page</Header>
        <Card.Group>
          {newest.map((recipe, index) => <UserHomeRecipes key={index} recipe={recipe} />)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserHome.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Home');
  return {
    recipes: Recipes.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(UserHome);
