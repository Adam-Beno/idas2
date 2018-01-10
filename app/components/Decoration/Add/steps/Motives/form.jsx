import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import validator from 'validator';
import { Checkbox } from 'redux-form-material-ui';
import _map from 'lodash/map';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';

import { FormControlLabel } from 'material-ui/Form';


class AddDecorationMotivesForm extends Component {
  static propTypes = {
    motives: propTypes.array.isRequired,
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            {_map(this.props.motives, motive => (
              <FormControlLabel key={motive.id} control={<Field name={`_${motive.id}`} component={Checkbox} />} label={motive.name} />
            ))}
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
    form: 'addDecorationMotivesForm',  // a unique identifier for this form
  }),
)(AddDecorationMotivesForm);
