import React from 'react';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardActions } from 'material-ui/Card';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import RegisterForm from './form';

import style from './style';
import { checkAgeRequirement } from './actions';
import { ageRequirement } from './selectors';
import messages from './messages';

const Register = (props) => {
  const { classes, mutate } = props;

  const handleSubmit = (values) => {
    mutate({
      variables: {
        createUser: {
          data: {
            firstName: 'aa',
            lastName: 'a',
            email: values.get('email'),
            password: values.get('password'),
          },
        },
      },
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Grid container gutter={24} className={classes.flexContainer}>
      <Grid item sm={3} xs={12} className={classes.flexItem}>
        <Card>
          <RegisterForm onSubmit={handleSubmit} />
          <CardActions className={classes.textCenter}>
            <small><FormattedMessage {...messages.haveAccountQuestion} />&nbsp;<Link to="/login"><FormattedMessage {...messages.signIn} /></Link></small>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

Register.propTypes = {
  classes: propTypes.object.isRequired,
  mutate: propTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ageRequirement,
});

function mapDispatchToProps(dispatch) {
  return {
    checkAgeRequirement: () => dispatch(checkAgeRequirement()),
  };
}

const registerUser = gql`
  mutation createUser($createUser: CreateUserInput!) {
    createUser(input: $createUser) {
      id
      emailConfirmation
    }
  }
`;

export default compose(
  graphql(registerUser),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(style),
)(Register);
