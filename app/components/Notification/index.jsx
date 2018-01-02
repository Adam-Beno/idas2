import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import { message, displayNotification } from './selectors';
import { dismissNotification } from './actions';

const Notification = props => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    open={props.displayNotification}
    autoHideDuration={6000}
    onClose={() => props.dismissNotification(true)}
    SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
    message={<span id="message-id">{props.message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.dismissNotification(true)}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

Notification.propTypes = {
  message: propTypes.string.isRequired,
  displayNotification: propTypes.bool.isRequired,
  dismissNotification: propTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  message,
  displayNotification,
});

function mapDispatchToProps(dispatch) {
  return {
    dismissNotification: display => dispatch(dismissNotification(display)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Notification);
