import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  TextField,
} from 'redux-form-material-ui';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import User from '../../models/user';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('username')) {
    errors.username = 'Required';
  }
  return errors;
};

const asyncValidate = values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  return sleep(0).then(() => {
    User.usernameExists(values.get('username')).then(data => {
      if (data) {
        throw { username: 'That username is taken' };
      }
    });
  });
};


class UserDetailsForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} lg={4} xl={4}>
            <Field name="username" label="Username" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} lg={4} xl={4}>
            <Field name="firstName" label="First name" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} lg={4} xl={4}>
            <Field name="lastName" label="Surname" component={TextField} fullWidth />
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
  form: 'userDetailsForm',  // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ['username'],
})(UserDetailsForm);
