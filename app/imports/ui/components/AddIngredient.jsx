import React from 'react';
import { Ingredient, IngredientSchema } from '/imports/api/ingredient/ingredient';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
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
      Bert.alert({ type: 'danger', message: `Add Note failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add Note succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, size, price, vendor } = data;
    Ingredient.insert({ name, size, price, vendor }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <AutoForm ref={(ref) => { this.formRef = ref; }} schema={IngredientSchema} onSubmit={this.submit}>
        <Segment>
          <TextField name='name' value={this.props.name}/>
          <TextField name='size' value={this.props.size}/>
          <TextField name='price' value={this.props.price}/>
          <TextField name='vendor' value={this.props.vendor}/>
        </Segment>
      </AutoForm>
    );
  }
}

export default AddIngredient;
