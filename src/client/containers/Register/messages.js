import { defineMessages } from 'react-intl';

export default defineMessages({
  createNewAccount: {
    id: 'app.register.createNewAccount',
    defaultMessage: 'Create new account',
  },
  signUp: {
    id: 'app.register.signUp',
    defaultMessage: 'SIGN UP',
  },
  signIn: {
    id: 'app.register.signIn',
    defaultMessage: 'Sign in!',
  },
  haveAccountQuestion: {
    id: 'app.register.haveAccount',
    defaultMessage: 'Already have an account?',
  },
  passwordConfirmation: {
    id: 'app.register.passwordConfirmation',
    defaultMessage: 'Password confirmation',
  },
  password: {
    id: 'app.register.password',
    defaultMessage: 'Password',
  },
  email: {
    id: 'app.register.email',
    defaultMessage: 'Email',
  },
  noEmail: {
    id: 'app.register.validation.email',
    defaultMessage: 'Enter an email address.',
  },
  invalidEmail: {
    id: 'app.register.validation.invalidEmail',
    defaultMessage: 'Invalid email address.',
  },
  noPassword: {
    id: 'app.register.validation.password',
    defaultMessage: 'Enter a password.',
  },
  invalidPassword: {
    id: 'app.register.validation.invalidPassword',
    defaultMessage: 'Password has to be at least 8 characters long.',
  },
  noPasswordConfirmation: {
    id: 'app.register.validation.passwordConfirmation',
    defaultMessage: 'Enter a password confirmation',
  },
  matchingPasswords: {
    id: 'app.register.validation.matchingPasswords',
    defaultMessage: 'Password confirmation does not match with the Password.',
  },
  emailTaken: {
    id: 'app.register.validation.emailTaken',
    defaultMessage: 'This email address is already in use.',
  },
});
