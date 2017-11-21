import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardActions } from 'material-ui/Card';

import { setUserToken } from 'client/containers/App/actions';
import { setErrorMessages, unsetErrorMessages } from './actions';
import LoginForm from './form';
import style from './style';
import messages from './messages';

const Login = (props) => {
  const { classes, mutate, setUser, redirect, setErrors, unsetErrors } = props;

  const handleSubmit = async (values) => {
    try {
      const response = await mutate({
        variables: {
          loginUser: {
            email: values.get('email'),
            password: values.get('password'),
          },
        },
      });
      setUser(response.data.loginUser);
      unsetErrors();
      redirect();
    } catch (err) {
      setErrors(map(err.graphQLErrors, 'message'));
    }
  };

  return (
    <Grid container gutter={24} className={classes.flexContainer}>
      <Grid item sm={3} xs={12} className={classes.flexItem}>
        <Card>
          <LoginForm onSubmit={handleSubmit} />
          <CardActions className={classes.textCenter}>
            <small><FormattedMessage {...messages.createAccountQuestion} />&nbsp;<Link to="/register"><FormattedMessage {...messages.createAccount} /></Link></small>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  classes: propTypes.object.isRequired,
  mutate: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired,
  redirect: propTypes.func.isRequired,
  setErrors: propTypes.func.isRequired,
  unsetErrors: propTypes.func.isRequired,
};

const loginUser = gql`
  mutation loginUser($loginUser: LoginUserInput!) {
    loginUser(input: $loginUser)
  }
`;

function mapDispatchToProps(dispatch) {
  return {
    setUser: token => dispatch(setUserToken(token)),
    redirect: () => dispatch(replace('/')),
    setErrors: err => dispatch(setErrorMessages(err)),
    unsetErrors: () => dispatch(unsetErrorMessages()),
  };
}

export default compose(
  graphql(loginUser),
  withStyles(style),
  connect(null, mapDispatchToProps),
)(Login);
