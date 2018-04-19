import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AddIngredient from '/imports/ui/components/AddIngredient';

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
    const { name, image, description, steps, createdAt } = data;
    const owner = Meteor.user().username;
    Recipes.insert({ name, image, description, steps, owner, createdAt }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Recipe</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }}
                      schema={RecipeSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='name'/>
                <TextField name='image'/>
                <TextField name='description'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
                <HiddenField name='createdAt' value={new Date()}/>
              </Segment>
                <AddIngredient />
              <Segment>
                <TextField name='steps'/>
              </Segment>
              <SubmitField value='Submit'/>
            </AutoForm>
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
