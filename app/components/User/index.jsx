import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _omit from 'lodash/omit';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';

import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import LockIcon from 'material-ui-icons/Lock';
import KeyIcon from 'material-ui-icons/VpnKey';

import styles from './styles';
import UserDetailsForm from './detailsForm';
import LoginForm from './loginForm';
import { tab, authenticated } from './selectors';
import { tabChange, authenticate } from './actions';

import { update, fetch } from '../../crud/actions';
import { data, loading } from '../../crud/selectors';
import Model from '../../models/user';

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: propTypes.node.isRequired,
};

class User extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    tab: propTypes.number.isRequired,
    tabChange: propTypes.func.isRequired,
    authenticated: propTypes.object.isRequired,
    authenticate: propTypes.func.isRequired,
    update: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.submitUserDetails = this.submitUserDetails.bind(this);
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

  submitUserDetails(vals) {
    this.props.update(Model, vals.toJSON(), { id: this.props.authenticated.id });
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
            <Card className={classes.card}>
              <CardContent className={classes.root}>
                <Tabs
                  value={props.tab}
                  className={classes.tabsRoot}
                  onChange={(event, value) => props.tabChange(value)}
                  indicatorColor="accent"
                  textColor="accent"
                  fullWidth
                >
                  <Tab icon={<InfoOutlineIcon />} label="PERSONAL INFORMATION" />
                  <Tab icon={<LockIcon />} label="PASSWORD" />
                  <Tab icon={<KeyIcon />} label="ROLES" />
                </Tabs>
                {props.tab === 0 &&
                  <TabContainer>
                    {(!props.loading && props.data.has('users')) &&
                    <UserDetailsForm onSubmit={this.submitUserDetails} initialValues={props.data.get('users').first()} />}
                  </TabContainer>}
                {props.tab === 1 &&
                  <TabContainer>
                    Second tab
                  </TabContainer>}
                {props.tab === 2 &&
                  <TabContainer>
                    Third tab
                  </TabContainer>}
              </CardContent>
            </Card>
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
    tabChange: (newTab) => dispatch(tabChange(newTab)),
    authenticate: (username, password) => dispatch(authenticate(username, password)),
    update: (model, values, refetch) => dispatch(update(model, values, refetch)),
    fetch: (model, params) => dispatch(fetch(model, params)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(User);
