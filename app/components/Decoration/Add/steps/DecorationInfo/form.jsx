import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import validator from 'validator';
import { TextField } from 'redux-form-material-ui';
import _map from 'lodash/map';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';

import SelectWrapper from '../../../../../utils/selectWrapper';
import styles from './styles';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('categoriesId')) {
    errors.categoriesId = 'Required';
  }
  if (!values.get('name')) {
    errors.name = 'Required';
  } else if (!validator.isLength(values.get('name'), { min: 1, max: 255 })) {
    errors.name = 'Must be between 1 to 255 characters';
  }
  if (!values.get('width')) {
    errors.width = 'Required';
  } else if (!validator.isLength(values.get('width'), { min: 1, max: 11 })) {
    errors.width = 'Must be between 1 to 11 digits';
  }
  if (!values.get('height')) {
    errors.height = 'Required';
  } else if (!validator.isLength(values.get('height'), { min: 1, max: 11 })) {
    errors.height = 'Must be between 1 to 11 digits';
  }

  return errors;
};

class AddDecorationInfoForm extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    categories: propTypes.array.isRequired,
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} lg={4}>
            <Field id="category" label="Category" name="categoriesId" component={SelectWrapper} placeholder="Category" className={this.props.classes.selectField} autoWidth>
              <MenuItem value=""><em>None</em></MenuItem>
              {_map(this.props.categories, (value, index) => (
                <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={12}>
            <Field name="name" label="Name" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Field name="width" label="Width" type="number" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Field name="height" label="Height" type="number" component={TextField} fullWidth />
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
  withStyles(styles),
  reduxForm({
    form: 'addDecorationInfoForm',  // a unique identifier for this form
    validate,
  }),
)(AddDecorationInfoForm);
