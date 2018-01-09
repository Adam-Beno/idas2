import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';

class RoleTab extends React.Component {
  static propTypes = {
    authenticated: propTypes.object.isRequired,
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>NYI</div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RoleTab);

