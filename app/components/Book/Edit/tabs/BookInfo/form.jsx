import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  TextField,
  Select,
} from 'redux-form-material-ui';
import _map from 'lodash/map';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';

import SelectWrapper from '../../../../../utils/selectWrapper';
import styles from './styles';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required';
  }
  if (!values.get('authorsId')) {
    errors.authorsId = 'Required';
  }
  if (!values.get('printersId')) {
    errors.printersId = 'Required';
  }
  if (!values.get('signature')) {
    errors.signature = 'Required';
  }
  if (!values.get('barcode')) {
    errors.barcode = 'Required';
  }
  if (!values.get('numberOfPages')) {
    errors.numberOfPages = 'Required';
  }
  if (!values.get('placeOfIssue')) {
    errors.placeOfIssue = 'Required';
  }
  if (!values.get('language')) {
    errors.language = 'Required';
  }
  if (!values.get('description')) {
    errors.description = 'Required';
  }

  return errors;
};

class EditBookForm extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    authors: propTypes.array.isRequired,
    printers: propTypes.array.isRequired,
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} lg={4}>
            <Field id="name" label="Author" name="authorsId" component={SelectWrapper} placeholder="Author" className={this.props.classes.selectField} autoWidth>
              <MenuItem value=""><em>None</em></MenuItem>
              {_map(this.props.authors, (value, index) => (
                <MenuItem value={value.id} key={index}>{`${value.name} ${value.surname}`}</MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Field id="printer" label="Printer" name="printersId" component={SelectWrapper} placeholder="Printer" className={this.props.classes.selectField} autoWidth>
              <MenuItem value=""><em>None</em></MenuItem>
              {_map(this.props.printers, (value, index) => (
                <MenuItem value={value.id} key={index}>{`${value.name} ${value.surname}`}</MenuItem>
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
          Save changes
        </Button>
      </form>
    );
  }
}
export default compose(
  withStyles(styles),
  reduxForm({
    form: 'editBookForm',  // a unique identifier for this form
    validate,
  }),
)(EditBookForm);
