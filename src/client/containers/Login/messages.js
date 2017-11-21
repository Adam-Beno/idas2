import { defineMessages } from 'react-intl';

export default defineMessages({
  signIn: {
    id: 'app.login.signIn',
    defaultMessage: 'Sign in',
  },
  email: {
    id: 'app.login.email',
    defaultMessage: 'Email',
  },
  password: {
    id: 'app.login.password',
    defaultMessage: 'Password',
  },
  createAccountQuestion: {
    id: 'app.login.createAccountQuestion',
    defaultMessage: 'First time here?',
  },
  createAccount: {
    id: 'app.login.createQuestion',
    defaultMessage: 'Create an account!',
  },
  noEmail: {
    id: 'app.login.validation.email',
    defaultMessage: 'Enter an email address.',
  },
  invalidEmail: {
    id: 'app.login.validation.invalidEmail',
    defaultMessage: 'Invalid email address.',
  },
  noPassword: {
    id: 'app.login.validation.password',
    defaultMessage: 'Enter a password.',
  },
});
