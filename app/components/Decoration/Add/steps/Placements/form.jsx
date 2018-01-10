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
  if (!values.get('x')) {
    errors.x = 'Required';
  } else if (!validator.isLength(values.get('x'), { min: 1, max: 11 })) {
    errors.x = 'Must be between 1 to 11 digits';
  }
  if (!values.get('y')) {
    errors.y = 'Required';
  } else if (!validator.isLength(values.get('y'), { min: 1, max: 11 })) {
    errors.y = 'Must be between 1 to 11 digits';
  }
  if (!values.get('pageNumber')) {
    errors.pageNumber = 'Required';
  } else if (!validator.isLength(values.get('pageNumber'), { min: 1, max: 11 })) {
    errors.pageNumber = 'Must be between 1 to 11 digits';
  }

  return errors;
};

class AddDecorationPlacemenetsForm extends Component {
  static propTypes = {
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <Field name="x" label="X" type="number" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <Field name="y" label="Y" type="number" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <Field name="pageNumber" label="Page number" type="number" component={TextField} fullWidth />
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
    form: 'addDecorationPlacemenetsForm',  // a unique identifier for this form
    validate,
  }),
)(AddDecorationPlacemenetsForm);
