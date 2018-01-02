import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  TextField,
  Select,
} from 'redux-form-material-ui';
import _map from 'lodash/map';
import { MenuItem } from 'material-ui/Menu';
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

class AddBookForm extends Component {
  static propTypes = {
    authors: propTypes.array.isRequired,
    printers: propTypes.array.isRequired,
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} lg={4}>
            <Field name="authorId" component={Select} placeholder="Author">
              <MenuItem value=""><em>None</em></MenuItem>
              {_map(this.props.authors, (value, index) => (
                <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Field name="printerId" component={Select} placeholder="Printer">
              <MenuItem value=""><em>None</em></MenuItem>
              {_map(this.props.printers, (value, index) => (
                <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={12}>
            <Field name="name" label="Name" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Field name="signature" label="Signature" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Field name="barcode" label="Barcode" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Field name="numberOfPages" label="Number of pages" type="number" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Field name="placeOfIssue" label="Place of issue" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Field name="language" label="Language" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Field name="yearOfIssue" label="Year of Issue" type="number" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Field name="periodOfIssue" label="Period of Issue" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Field name="description" label="Description" multiline component={TextField} fullWidth />
          </Grid>
        </Grid>
        <br />
        <Button type="submit" raised color="primary" disabled={submitting}>
          Submit
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'addBookForm',  // a unique identifier for this form
  validate,
})(AddBookForm);
