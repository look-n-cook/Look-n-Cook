import React from 'react';
import DatePicker from 'react-datepicker';
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
      keyword: '',
      startDate: null,
      ingredient: '',
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      submittedKeyword: '',
      submittedDate: '',
      submittedIngredient: '',
      submittedVegan: false,
      submittedGlutenFree: false,
      submittedDairyFree: false,
      cardList: this.props.recipes,
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleCheck = (e, { name, checked }) => this.setState({ [name]: checked })

  handleDate(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit = () => {
    const { keyword, ingredient, vegan, glutenFree, dairyFree } = this.state;

    if (keyword !== '') {
      this.setState({ submittedKeyword: keyword });
    } else {
      this.setState({ submittedKeyword: '' });
    }

    if (this.state.startDate === null) {
      this.setState({ submittedDate: '' });
    } else {
      this.setState({ submittedDate: this.state.startDate.toDate().toLocaleDateString('en-US') });
    }

    if (ingredient !== '') {
      this.setState({ submittedIngredient: ingredient });
    } else {
      this.setState({ submittedIngredient: '' });
    }

    if (vegan !== false) {
      this.setState({ submittedVegan: vegan });
    } else {
      this.setState({ submittedVegan: false });
    }

    if (glutenFree !== false) {
      this.setState({ submittedGlutenFree: glutenFree });
    } else {
      this.setState({ submittedGlutenFree: false });
    }

    if (dairyFree !== false) {
      this.setState({ submittedDairyFree: dairyFree });
    } else {
      this.setState({ submittedDairyFree: false });
    }
  }

  printRecipes() {
    this.recipes = this.props.recipes.map((recipe) => recipe);

    if (this.state.submittedKeyword !== '') {
      const keyword = this.state.submittedKeyword;
      this.recipes = _.filter((this.recipes), function (recipe) {
        if (recipe.name.match(keyword) || recipe.description.match(keyword)) {
          return recipe;
        }
        return null;
      });
    }

    if (this.state.submittedDate !== '') {
      this.recipes = _.filter(
          (this.recipes),
          (recipe) => recipe.createdAt.toLocaleDateString('en-US') === this.state.submittedDate,
      );
    }

    if (this.state.submittedIngredient !== '') {
      const ingredient = this.state.submittedIngredient;
      this.recipes = _.filter((this.recipes), function (recipe) {
        if (_.find((recipe.ingredients), (recipeIngredient) => recipeIngredient.name.match(ingredient))) {
          return recipe;
        }
        return null;
      });
    }

    if (this.state.submittedVegan !== false) {
      this.recipes = _.filter((this.recipes), (recipe) => recipe.vegan === true);
    }

    if (this.state.submittedGlutenFree !== false) {
      this.recipes = _.filter((this.recipes), (recipe) => recipe.glutenFree === true);
    }

    if (this.state.submittedDairyFree !== false) {
      this.recipes = _.filter((this.recipes), (recipe) => recipe.dairyFree === true);
    }

    if (this.state.submittedKeyword !== '' ||
        this.state.submittedDate !== '' ||
        this.state.submittedIngredient !== '' ||
        this.state.submittedVegan !== false ||
        this.state.submittedGlutenFree !== false ||
        this.state.submittedDairyFree !== false) {
      return this.recipes.map((recipe, index) => <UserHomeRecipe key={index} recipe={recipe}/>);
    }

    return this.props.recipes.map((recipe, index) => <UserHomeRecipe key={index} recipe={recipe}/>);
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

    const {
      keyword,
      ingredient,
      vegan,
      glutenFree,
      dairyFree,
    } = this.state;

    return (
        <Grid columns={2} style={gridStyle}>
          <Grid.Column style={leftColStyle}>
            <Container>
              <Card.Group style={cardGroupStyle}>
                {this.printRecipes()}
              </Card.Group>
            </Container>
          </Grid.Column>
          <Grid.Column style={rightColStyle}>
            <Container style={searchStyle}>
              <h2>Search</h2>
              <hr/>
              <br/>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Input name='keyword' value={keyword} label='Keywords' placeholder='Enter keyword'
                              onChange={this.handleChange}/>
                </Form.Group>
                <br/>
                <Form.Field name='date' label='Date'/>
                <DatePicker
                    placeholderText='Select date'
                    selected={this.state.startDate}
                    onChange={this.handleDate}
                />
                <br/>
                <br/>
                <Form.Group>
                  <Form.Input name='ingredient' value={ingredient} label='Ingredients' placeholder='Enter ingredient'
                              onChange={this.handleChange}/>
                </Form.Group>
                <br/>
                <Form.Field label='Restrictions'/>
                <Form.Group>
                  <Form.Checkbox name='glutenFree' label='Gluten-free' checked={glutenFree}
                                 onChange={this.handleCheck}/>
                  <Form.Checkbox name='vegan' label='Vegan' checked={vegan} onChange={this.handleCheck}/>
                  <Form.Checkbox name='dairyFree' label='Dairy-free' checked={dairyFree} onChange={this.handleCheck}/>
                </Form.Group>
                <br/>
                <hr/>
                <Button content='Search'/>
              </Form>
              <br/>
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
