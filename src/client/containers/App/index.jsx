import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { FormattedMessage } from 'react-intl';
import { replace } from 'react-router-redux';
import { gql } from 'react-apollo';
import moment from 'moment';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import AvTimerIcon from 'material-ui-icons/AvTimer';
import ShareIcon from 'material-ui-icons/Share';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { Link } from 'react-router-dom';
import applyMiddleware from 'client/utils/applyMiddleware';

import Notification from 'client/containers/Notification';
import { showNotification } from 'client/containers/Notification/actions';
import { switchMenuState, unsetUserToken, setUserToken } from './actions';
import { menuState, user, userToken } from './selectors';
import style from './style';
import messages from './messages';

class App extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        <Notification />
        {props.children}
      </div>
    );
  } // render()
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(style),
)(App);
