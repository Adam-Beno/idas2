import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';


import { update, fetch } from '../../../../crud/actions';
import { data, loading } from '../../../../crud/selectors';
import Model from '../../../../models/user';

import ReduxForm from './form';

class InfoTab extends React.Component {
  static propTypes = {
    authenticated: propTypes.object.isRequired,
    update: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
  }

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(vals) {
    this.props.update(Model, vals.toJSON(), { id: this.props.authenticated.id });
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        {(!props.loading && props.data.has('users')) &&
          <ReduxForm onSubmit={this.handleSubmit} initialValues={props.data.get('users').first()} />}
      </div>

    );
  }

}

const mapStateToProps = createStructuredSelector({
  data,
  loading,
});

const mapDispatchToProps = dispatch => ({
  update: (model, values, refetch) => dispatch(update(model, values, refetch)),
  fetch: (model, params) => dispatch(fetch(model, params)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(InfoTab);

