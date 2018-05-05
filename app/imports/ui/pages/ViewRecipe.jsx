import React from 'react';
import { Grid, Loader, Header, Image, List, Menu, Feed, Table } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { Reviews } from '/imports/api/review/review';
import Review from '/imports/ui/components/Review';
import RecipeListVendor from '/imports/ui/components/RecipeListVendor';
import AddReview from '/imports/ui/components/AddReview';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '/imports/api/vendor/vendor';

/** Renders the Page for editing a single document. */
class ViewRecipe extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const cardStyle = {
      background: '#F3E2C4',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    };

    const vendorStyle = {
      background: '#CAB494',
    };

    const tableStyle = {
      background: '#edd6af',
    };

    const dietArray = [];
    if (this.props.doc.vegan === true) {
      dietArray.push('Vegan');
    }
    if (this.props.doc.glutenFree === true) {
      dietArray.push('Gluten Free');
    }
    if (this.props.doc.dairyFree === true) {
      dietArray.push('Dairy Free');
    }

    const ingArray = _.map(
        (this.props.doc.ingredients),
        (ing) => (ing),
    );

    console.log('ViewRecipe{');
    console.log(this.props.doc.ingredients);
    console.log(ingArray);
    console.log('}');

    return (
        <Grid container divided={'vertically'} style={cardStyle}>
          <Grid.Row centered columns={2} padded>
            <Grid.Column>
              <Header as="h1" textAlign="center">{this.props.doc.name}</Header>
              <Grid>
                <Grid.Row centered columns={2}>
                  <Grid.Column>
                    <Header as="h4" textAlign="center">Recipe By: {this.props.doc.owner}</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h4"
                            textAlign="center">Created: {this.props.doc.createdAt.toLocaleDateString('en-US')}</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Header as="h4" textAlign="center">"{this.props.doc.description}"</Header>

              <Grid textAlign={'center'}>
                <Menu compact borderless text textAlign={'center'}>
                  {dietArray.map((diet, index) => <Menu.Item key={index}>{`- ${diet}`}</Menu.Item>)}
                </Menu>
              </Grid>

              <List bulleted>
                <List.Header as={'h3'}>Ingredients</List.Header>
                {this.props.doc.ingredients.map((ing, index) => <List.Item
                    key={index}>{ing.measurement} {ing.name}</List.Item>)}
              </List>

              <List ordered>
                <List.Header as={'h3'}>Directions</List.Header>
                {this.props.doc.steps.map((step, index) => <List.Item
                    key={index}>{step}</List.Item>)}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Image centered height={'500px'} src={this.props.doc.image}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Table style={tableStyle}>
                <Table.Header style={vendorStyle}>
                  <Table.Row>
                    <Table.HeaderCell style={vendorStyle}></Table.HeaderCell>
                    <Table.HeaderCell style={vendorStyle}>Vendor</Table.HeaderCell>
                    <Table.HeaderCell style={vendorStyle}>Quantity</Table.HeaderCell>
                    <Table.HeaderCell style={vendorStyle}>Price</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(
                      (ingArray),
                      (ing, index) => <RecipeListVendor key={index} ingredient={ing.name} vendor={this.props.vendors}/>,
                  )}
                </Table.Body>
              </Table>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Header as="h2" textAlign="left">
                  Reviews
                </Header>
                  {this.props.reviews.map((review, index) => <Review key={index} review={review}/>)}
                <AddReview owner={Meteor.user().username} recipeId={this.props.doc._id}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ViewRecipe.propTypes = {
  vendors: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
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
  const subscription2 = Meteor.subscribe('Reviews');
  const subscription3 = Meteor.subscribe('VendorList');
  return {
    vendors: Vendors.find({}).fetch(),
    reviews: Reviews.find({ recipeId: documentId }).fetch(),
    doc: Recipes.findOne({ _id: documentId }),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ViewRecipe);
