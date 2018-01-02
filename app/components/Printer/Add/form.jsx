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
  return errors;
};

class AddPrinterForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="name" label="First name" component={TextField} fullWidth />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Field name="surname" label="Last name" component={TextField} fullWidth />
          </Grid>
        </Grid>
        <br />
        <Button type="submit" raised color="primary" disabled={submitting}>
          ADD NEW PRINTER
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'addPrinterForm',  // a unique identifier for this form
  validate,
})(AddPrinterForm);
