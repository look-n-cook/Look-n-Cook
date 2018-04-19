import React from 'react';
import { Ingredients, IngredientSchema } from '/imports/api/ingredient/ingredient';
import { Recipes } from '/imports/api/recipe/recipe';
import { Segment, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';


/** Renders the Page for adding a document. */
class AddIngredient extends React.Component {

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
      Bert.alert({ type: 'danger', message: `Add Ingredient failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add Ingredient succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, quantity } = data;
    Ingredients.insert({ name, quantity }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <AutoForm ref={(ref) => { this.formRef = ref; }} schema={IngredientSchema} onSubmit={this.submit}>
        <Segment>
          <Form.Group widths='equal'>
            <TextField label="Add an ingredient" name='name'/>
            <NumField name='quantity' decimal={false}/>
            <SubmitField value='Add'/>
            <ErrorsField/>
          </Form.Group>
        </Segment>
      </AutoForm>
    );
  }
}

export default AddIngredient;
