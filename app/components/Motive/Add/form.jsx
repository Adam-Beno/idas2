import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  Checkbox,
  RadioGroup,
  Select,
  TextField,
  Switch,
  FormControlLabel,
} from 'redux-form-material-ui';

import validate from './validate';

const contact = class ContactForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="name" component={TextField} placeholder="Name of the new motive" />
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    );
  }
};

export default reduxForm({
  form: 'motiveAddForm',  // a unique identifier for this form
  validate,
})(contact);
