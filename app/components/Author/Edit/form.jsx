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
  if (!values.get('surname')) {
    errors.surname = 'Required';
  }
  if (!values.get('nickname')) {
    errors.nickname = 'Required';
  }
  if (!values.get('age')) {
    errors.age = 'Required';
  }
  if (!values.get('genre')) {
    errors.genre = 'Required';
  }
  return errors;
};

class EditAuthorForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="name" label="First name" component={TextField} fullWidth />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="nickname" label="Artistic name" component={TextField} fullWidth />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="surname" label="Last name" component={TextField} fullWidth />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="age" label="Age" type="number" component={TextField} fullWidth />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="genre" label="Genre" component={TextField} fullWidth />
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
  form: 'editAuthorForm',  // a unique identifier for this form
  validate,
})(EditAuthorForm);
