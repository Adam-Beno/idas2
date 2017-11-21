import React from 'react';
import propTypes from 'prop-types';
import Button from 'material-ui/Button';
import validator from 'validator';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { LabelSwitch } from 'material-ui/Switch';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { gql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import map from 'lodash/map';
import { createStructuredSelector } from 'reselect';
import apolloClient from 'client/apollo';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import IntlProvider from 'client/intl';
import messages from './messages';

import {
  TextField,
} from 'client/utils/redux-form-material-ui';
import { errorMessages } from './selectors';
import style from './style';

const IntlProv = new IntlProvider();
const intl = IntlProv.getIntl();

const RegisterForm = (props) => {
  // const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={props.handleSubmit}>
      <CardContent className={props.classes.textCenter}>
        <Typography type="headline" component="h3">
          <FormattedMessage {...messages.createNewAccount} />
        </Typography>
        <Field name="email" component={TextField} label={props.intl.formatMessage(messages.email)} fullWidth />
        <Field name="password" component={TextField} type="password" label={props.intl.formatMessage(messages.password)} fullWidth />
        <Field name="password_confirmation" component={TextField} type="password" label={props.intl.formatMessage(messages.passwordConfirmation)} fullWidth />
        <Button type="submit" raised color="accent" className={props.classes.buttonMargin}><FormattedMessage {...messages.signUp} /></Button>
        <ul>
          {map(props.errorMessages, (str, key) => <li key={key}>{str}</li>)}
        </ul>
      </CardContent>
    </form>
  );
};

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (values.size > 0) {
    if (!values.has('email')) {
      errors.email = intl.formatMessage(messages.noEmail);
    } else if (!validator.isEmail(values.get('email'))) {
      errors.email = intl.formatMessage(messages.invalidEmail);
    }

    if (!values.has('password')) {
      errors.password = intl.formatMessage(messages.noPassword);
    } else if (!validator.isLength(values.get('password'), { min: 8 })) {
      errors.password = intl.formatMessage(messages.invalidPassword);
    }

    if (!values.has('password_confirmation')) {
      errors.password_confirmation = intl.formatMessage(messages.noPasswordConfirmation);
    }

    if (values.has('password') && values.has('password_confirmation')) {
      if (values.get('password') !== values.get('password_confirmation')) {
        errors.password_confirmation = intl.formatMessage(messages.matchingPasswords);
      }
    }
  }

  return errors;
};

const validateEmailAddress = gql`
  query checkEmailTaken($emailTaken: CheckEmailInput!) {
    checkEmailTaken(input: $emailTaken)
  }
`;

function asyncValidate(values) {
  return new Promise((resolve, reject) => {
    if (!validator.isEmail(values.get('email'))) {
      reject({ email: intl.formatMessage(messages.invalidEmail) });
    } else {
      apolloClient.query({
        query: validateEmailAddress,
        variables: {
          emailTaken: {
            email: values.get('email'),
          },
        },
      }).then((result) => {
        if (!result.data.checkEmailTaken) {
          resolve();
        } else {
          reject({ email: intl.formatMessage(messages.emailTaken) });
        }
      });
    }
  });
}

RegisterForm.propTypes = {
  classes: propTypes.object.isRequired,
  handleSubmit: propTypes.func.isRequired,
  errorMessages: propTypes.array,
  intl: intlShape.isRequired,
};

RegisterForm.defaultProps = {
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
    form: 'registerForm',
    fields: ['email', 'password', 'password_confirmation'],
    validate,
    asyncValidate,
    asyncBlurFields: ['email'],
  }),
)(RegisterForm);
