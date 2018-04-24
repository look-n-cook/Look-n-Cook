import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Grid, Form, Button } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import UserHomeRecipe from '/imports/ui/components/UserHomeRecipes';

import 'react-datepicker/dist/react-datepicker.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const gridStyle = {
      marginRight: '7.5%',
      marginLeft: '7.5%',
    };
    const leftColStyle = {
      leftMargin: '0',
      rightMargin: '10px',
      width: '70%',
    };
    const rightColStyle = {
      rightMargin: '0',
      leftMargin: '5px',
      width: '30%',
    };
    const searchStyle = {
      background: '#D7E0CD',
      padding: '5%',
      borderRadius: '5px',
    };
    const cardGroupStyle = {
      marginLeft: '0',
    };

    return (
        <Grid columns={2} style={gridStyle}>
          <Grid.Column style={leftColStyle}>
            <Container>
              <Card.Group style={cardGroupStyle}>
                {this.props.recipes.map((recipe, index) => <UserHomeRecipe key={index} recipe={recipe}/>)}
              </Card.Group>
            </Container>
          </Grid.Column>
          <Grid.Column style={rightColStyle}>
            <Container style={searchStyle}>
              <h2>Search</h2>
              <hr/>
              <br/>
              <Form>
                <Form.Group>
                  <Form.Input label='Keywords' placeholder='Enter text'/>
                </Form.Group>
                <br/>
                <Form.Field label='Date'/>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                <br/>
                <br/>
                <Form.Group>
                  <Form.Input label='Ingredients' placeholder='Enter text'/>
                </Form.Group>
                <br/>
                <Form.Field label='Restrictions'/>
                <Form.Group>
                  <Form.Checkbox label='Gluten-free'/>
                  <Form.Checkbox label='Vegan'/>
                  <Form.Checkbox label='Dairy-free'/>
                </Form.Group>
                <br/>
                <hr/>
                <Button type='submit'>Search</Button>
              </Form>
            </Container>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Search.propTypes = {
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
})(Search);
