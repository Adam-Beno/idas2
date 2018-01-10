import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { setStep } from '../../../actions';
import { create } from '../../../../../crud/actions';

import PlacementModel from '../../../../../models/placement';

import ReduxForm from './form';

class DecorationAddPlacemenets extends React.Component {
  static propTypes = {
    setStep: propTypes.func.isRequired,
    create: propTypes.func.isRequired,
    decoration: propTypes.object.isRequired,
  }

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(vals) {
    const values = vals.toJSON();
    values.decorationsId = this.props.decoration.id;
    this.props.create(PlacementModel, values);
    this.props.setStep(4);
  }

  render() {
    return (
      <div>
        <ReduxForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
  redirect: (location = '/') => dispatch(push(location)),
  setStep: stepIndex => dispatch(setStep(stepIndex)),
  fetch: (model, params) => dispatch(fetch(model, params)),
  create: (model, vals) => dispatch(create(model, vals)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DecorationAddPlacemenets);
