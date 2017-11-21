import React from 'react';
import propTypes from 'prop-types';
import Button from 'material-ui/Button';
import validator from 'validator';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { createStructuredSelector } from 'reselect';
import map from 'lodash/map';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import IntlProvider from 'client/intl';

import {
  TextField,
} from 'client/utils/redux-form-material-ui';

import { errorMessages } from './selectors';
import style from './style';
import messages from './messages';

const IntlProv = new IntlProvider();
const intl = IntlProv.getIntl();

const LoginForm = props => (
  <form onSubmit={props.handleSubmit}>
    <CardContent className={props.classes.textCenter}>
      <Typography type="headline" component="h3">
        Sign in
      </Typography>
      <Field name="email" component={TextField} label={props.intl.formatMessage(messages.email)} fullWidth />
      <Field name="password" component={TextField} type="password" label={props.intl.formatMessage(messages.password)} fullWidth />
      <Button type="submit" raised color="accent" className={props.classes.buttonMargin} ><FormattedMessage {...messages.signIn} /></Button>
      <ul>
        {map(props.errorMessages, (str, key) => <li key={key}>{str}</li>)}
      </ul>
    </CardContent>
  </form>
);

const validate = (values) => {
  const errors = {};
  if (values.size > 0) {
    if (!values.has('email')) {
      errors.email = intl.formatMessage(messages.noEmail);
    } else if (!validator.isEmail(values.get('email'))) {
      errors.email = intl.formatMessage(messages.invalidEmail);
    }

    if (!values.has('password')) {
      errors.password = intl.formatMessage(messages.noPassword);
    }
  }
  return errors;
};

LoginForm.propTypes = {
  classes: propTypes.object.isRequired,
  handleSubmit: propTypes.func.isRequired,
  errorMessages: propTypes.array,
  intl: intlShape.isRequired,
};

LoginForm.defaultProps = {
  errorMessages: [],
};

const mapStateToProps = createStructuredSelector({
  errorMessages,
});

export default compose(
  withStyles(style),
  injectIntl,
  connect(mapStateToProps, null),
  reduxForm({
    form: 'loginForm',
    fields: ['email', 'password'],
    validate,
  }),
)(LoginForm);
