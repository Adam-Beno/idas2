import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  TextField,
} from 'redux-form-material-ui';
import Button from 'material-ui/Button';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('username')) {
    errors.username = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }
  return errors;
};

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="username" label="Username" component={TextField} fullWidth />
        <Field name="password" label="Password" type="password" component={TextField} fullWidth />
        <br />
        <br />
        <Button type="submit" raised color="primary" disabled={submitting}>
          Login
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate,
})(LoginForm);
