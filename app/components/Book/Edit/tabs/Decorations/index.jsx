import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';

class DecorationTab extends React.Component {
  static propTypes = {
    bookId: propTypes.number.isRequired,
  }

  componentWillMount() {
    console.log(this.props.bookId);
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
)(DecorationTab);

