import React from 'react';
import { Grid, Loader, Header, Segment, Image, Table } from 'semantic-ui-react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class ViewRecipe extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container divided={'vertically'} padded>
          <Grid.Row centered columns={2} padded>
            <Grid.Column>
              <Header as="h2" textAlign="center">{this.props.doc.name}</Header>
              <Table textAlign={'center'}>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Recipe By: {this.props.doc.owner}</Table.Cell>
                    <Table.Cell>Created: {this.props.doc.createdAt.toLocaleDateString('en-US')}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <span> "{this.props.doc.description}" </span>
            </Grid.Column>
            <Grid.Column>
              <Image height={'350px'} width={'350px'} src={this.props.doc.image}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Header as={'h3'}>Ingredients</Header>
            <span>{this.props.doc.ingredients}</span>
          </Grid.Row>
          <Grid.Row>
            <Header as={'h3'}>Directions</Header>
            <span>{this.props.doc.steps}</span>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ViewRecipe.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Home');
  return {
    doc: Recipes.findOne(documentId),
    ready: subscription.ready(),
  };
})(ViewRecipe);
