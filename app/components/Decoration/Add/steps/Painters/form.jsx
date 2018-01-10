import React, { Component } from 'react';

import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import validator from 'validator';
import { TextField } from 'redux-form-material-ui';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';


const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required';
  } else if (!validator.isLength(values.get('name'), { min: 1, max: 255 })) {
    errors.name = 'Must be between 1 to 255 characters';
  }
  if (!values.get('surname')) {
    errors.surname = 'Required';
  } else if (!validator.isLength(values.get('surname'), { min: 1, max: 255 })) {
    errors.surname = 'Must be between 1 to 255 characters';
  }
  if (!values.get('nickname')) {
    errors.nickname = 'Required';
  } else if (!validator.isLength(values.get('nickname'), { min: 1, max: 255 })) {
    errors.nickname = 'Must be between 1 to 255 characters';
  }

  return errors;
};

class AddDecorationPaintersForm extends Component {
  static propTypes = {
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Field name="name" label="Name" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Field name="surname" label="Surname" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Field name="nickname" label="Artistic name" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Field name="note" label="Note" multiline component={TextField} fullWidth />
          </Grid>
        </Grid>
        <br />
        <Button type="submit" raised color="primary" disabled={submitting}>
          next
        </Button>
      </form>
    );
  }
}
export default compose(
  reduxForm({
    form: 'addDecorationPaintersForm',  // a unique identifier for this form
    validate,
  }),
)(AddDecorationPaintersForm);
