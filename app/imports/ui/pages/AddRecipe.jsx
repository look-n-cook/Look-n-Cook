import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Grid, Segment, Header, Feed, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import BoolField from 'uniforms-semantic/BoolField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AddIngredient from '/imports/ui/components/AddIngredient';
import Ingredient from '/imports/ui/components/Ingredients';

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, image, description, vegan, glutenfree, etc, steps, createdAt } = data;
    const owner = Meteor.user().username;
    Recipes.insert({ name, image, description, vegan, glutenfree, etc, ingredientsList, steps, owner, createdAt }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Recipe</Header>
          <AutoForm ref={(ref) => { this.formRef = ref; }} schema={RecipeSchema} onSubmit={this.submit}>
            <Segment>
              <TextField name='name'/>
              <TextField name='image'/>
              <TextField name='description'/>
              <Form.Group>
                <BoolField name='vegan'/>
                <BoolField name='glutenfree'/>
                <BoolField name='etc'/>
              </Form.Group>
              <HiddenField name='owner' value='fakeuser@foo.com'/>
              <HiddenField name='ingredientsList' value='fakeId'/>
              <HiddenField name='createdAt' value={new Date()}/>
              <HiddenField name='steps' value='fakeSteps'/>
              <ErrorsField/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
          <Segment>
            <AddIngredient/>
            <Feed>
              {this.props.ingredients.map((ingredient, index) => <Ingredient key={index} ingredient={ingredient}/>)}
            </Feed>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

AddRecipe.propTypes = {
  ingredients: PropTypes.array.isRequired,
  recipe: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Ingredients');
  const subscription2 = Meteor.subscribe('Recipes');
  return {
    ingredients: Ingredients.find({}).fetch(),
    recipe: Recipes.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(AddRecipe);
