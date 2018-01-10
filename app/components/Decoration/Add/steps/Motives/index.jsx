import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import _map from 'lodash/map';
import _keys from 'lodash/keys';

import { withStyles } from 'material-ui/styles';

import { setStep } from '../../../actions';
import { fetch, create } from '../../../../../crud/actions';
import { loading, data } from '../../../../../crud/selectors';

import DecorationMotiveModel from '../../../../../models/decorationMotive';
import MotiveModel from '../../../../../models/motive';

import ReduxForm from './form';

class DecorationAddMotives extends React.Component {
  static propTypes = {
    setStep: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    create: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    data: propTypes.object.isRequired,
    decoration: propTypes.object.isRequired,
  }

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetch(MotiveModel);
  }

  handleSubmit(vals) {
    _map(_keys(vals.toJS()), n => {
      const entity = {
        decorationId: this.props.decoration.id,
        motiveId: Number(n.substr(1)),
      };
      this.props.create(DecorationMotiveModel, entity);
    });
    this.props.setStep(2);
  }

  render() {
    const { props } = this;
    return (
      <div>
        {!props.loading && props.data.has('motives') &&
          <ReduxForm onSubmit={this.handleSubmit} motives={props.data.get('motives').toJS()} />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading,
  data,
});

const mapDispatchToProps = dispatch => ({
  redirect: (location = '/') => dispatch(push(location)),
  setStep: stepIndex => dispatch(setStep(stepIndex)),
  fetch: (model, params) => dispatch(fetch(model, params)),
  create: (model, vals) => dispatch(create(model, vals)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DecorationAddMotives);
