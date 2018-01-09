import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';

import AccountIcon from 'material-ui-icons/AccountCircle';
import PasswordIcon from 'material-ui-icons/Lock';
import RoleIcon from 'material-ui-icons/VpnKey';

import styles from './styles';
import LoginForm from './loginForm';
import { tab, authenticated } from './selectors';
import { changeTab, authenticate } from './actions';

import { update, fetch } from '../../crud/actions';
import { data, loading } from '../../crud/selectors';
import Model from '../../models/user';

import InfoTab from './tabs/UserInfo';
import PasswordTab from './tabs/Password';
import RoleTab from './tabs/Role';

class User extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    tab: propTypes.number.isRequired,
    changeTab: propTypes.func.isRequired,
    authenticated: propTypes.object.isRequired,
    authenticate: propTypes.func.isRequired,
    update: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.authenticateUser = this.authenticateUser.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated.id) {
      this.props.fetch(Model, { id: this.props.authenticated.id });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authenticated.id && nextProps.authenticated.id) {
      this.props.fetch(Model, { id: nextProps.authenticated.id });
    }
  }

  authenticateUser(vals) {
    this.props.authenticate(vals.get('username'), vals.get('password'));
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        {props.authenticated.username ? (
          <div>
            <Typography type="title" gutterBottom>
              User
            </Typography>
            <AppBar position="static" color="default">
              <Tabs
                value={props.tab}
                onChange={(event, value) => props.changeTab(value)}
                indicatorColor="accent"
                textColor="accent"
                fullWidth
                centered
              >
                <Tab icon={<AccountIcon />} label="Account" />
                <Tab icon={<PasswordIcon />} label="Password" />
                <Tab icon={<RoleIcon />} label="Role" />
              </Tabs>
            </AppBar>
            <Paper className={classes.root}>
              {props.tab === 0 && <InfoTab authenticated={props.authenticated} />}
              {props.tab === 1 && <PasswordTab authenticated={props.authenticated} />}
              {props.tab === 2 && <RoleTab authenticated={props.authenticated} />}
            </Paper>
          </div>) : (
            <div>
              <Grid container spacing={24} className={classes.loginRoot}>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <Card className={classes.card}>
                    <CardHeader title="Login" />
                    <CardContent>
                      <LoginForm onSubmit={this.authenticateUser} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tab,
  authenticated,
  data,
  loading,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    changeTab: (newTab) => dispatch(changeTab(newTab)),
    authenticate: (username, password) => dispatch(authenticate(username, password)),
    update: (model, values, refetch) => dispatch(update(model, values, refetch)),
    fetch: (model, params) => dispatch(fetch(model, params)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(User);
