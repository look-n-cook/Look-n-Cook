import React from 'react';
import { Vendors, VendorSchema } from '/imports/api/vendor/vendor';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ListField from 'uniforms-semantic/ListField';
import NumField from 'uniforms-semantic/NumField';
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
class CreateList extends React.Component {

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
    const { ingredients } = data;
    const owner = Meteor.user().username;
    Vendors.insert({ ingredients, owner }, this.insertCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const formStyle = {
      background: '#D7E0CD',
    };
    const buttonStyle = {
      background: '#ACC198',
    };

    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Ingredients List</Header>
          <AutoForm ref={(ref) => { this.formRef = ref; }} schema={VendorSchema} onSubmit={this.submit}>
            <Segment style={formStyle}>
              <ListField name='ingredients'>
                <ListItemField name='$'>
                  <NestField>
                      <Form.Group widths='equal'>
                        <TextField name='name' placeholder='Name'/>
                        <TextField name='quantity' placeholder='Quantity'/>
                        <NumField name='price' placeholder='Price'/>
                        <HiddenField name='createdAt' value={new Date()}/>
                      </Form.Group>
                  </NestField>
                </ListItemField>
              </ListField>
              <HiddenField name='owner' value='fakeuser@foo.com'/>
              <ErrorsField/>
              <SubmitField style={buttonStyle} value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

CreateList.propTypes = {
  vendor: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Vendors');
  return {
    vendor: Vendors.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(CreateList);
