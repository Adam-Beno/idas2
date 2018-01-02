import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  TextField,
} from 'redux-form-material-ui';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required';
  }
  if (!values.get('description')) {
    errors.description = 'Required';
  }

  return errors;
};

class EditMotiveForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="name" label="Name" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Field name="description" label="Description" component={TextField} fullWidth multiline />
          </Grid>
        </Grid>
        <br />
        <Button type="submit" raised color="primary" disabled={submitting}>
          Save changes
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editMotiveForm',  // a unique identifier for this form
  validate,
})(EditMotiveForm);
