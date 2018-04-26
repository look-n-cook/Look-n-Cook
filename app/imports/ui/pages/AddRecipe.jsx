import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ListField from 'uniforms-semantic/ListField';
import NestField from 'uniforms-semantic/NestField';
import ListItemField from 'uniforms-semantic/ListItemField';
import ListDelField from 'uniforms-semantic/ListDelField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import BoolField from 'uniforms-semantic/BoolField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

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
    const { name, image, description, vegan, glutenFree, dairyFree, ingredients, steps, createdAt } = data;
    const owner = Meteor.user().username;
    Recipes.insert(
        { name, image, description, vegan, glutenFree, dairyFree, ingredients, steps, owner, createdAt },
        this.insertCallback,
    );
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
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
                <BoolField value={false} name='vegan'/>
                <BoolField value={false} name='glutenFree'/>
                <BoolField value={false} name='dairyFree'/>
              </Form.Group>
              <ListField name='ingredients'>
                <ListItemField name='$'>
                  <NestField>
                      <TextField name='name'/>
                      <TextField name='measurement'/>
                  </NestField>
                </ListItemField>
              </ListField>
              <HiddenField name='owner' value='fakeuser@foo.com'/>
              <HiddenField name='createdAt' value={new Date().toLocaleDateString('en-US')}/>
              <ListField name='steps'>
                <ListDelField name='$'/>
                <TextField name='$'/>
              </ListField>
              <ErrorsField/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddRecipe.propTypes = {
  recipe: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Recipes');
  return {
    recipe: Recipes.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(AddRecipe);
