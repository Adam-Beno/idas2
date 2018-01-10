import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';

import { setStep, setNewDecoration } from '../../../actions';
import { fetch, create } from '../../../../../crud/actions';
import { loading, data, createFailed, createId } from '../../../../../crud/selectors';

import CategoryModel from '../../../../../models/category';
import DecorationModel from '../../../../../models/decoration';

import ReduxForm from './form';

class DecorationAddInfo extends React.Component {
  static propTypes = {
    setStep: propTypes.func.isRequired,
    setNewDecoration: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    create: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    data: propTypes.object.isRequired,
    createFailed: propTypes.bool.isRequired,
    createId: propTypes.number.isRequired,
    bookId: propTypes.number.isRequired,
    decorationId: propTypes.number.isRequired,
  }

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    this.props.fetch(CategoryModel);
  }

  componentWillReceiveProps(nextProps) {
    // Check that model creation passesd
    if (this.props.createId !== nextProps.createId && !nextProps.createFailed) {
      // Select the new decoration
      nextProps.fetch(DecorationModel, { id: nextProps.createId });
    }
    // Check if the data was fetched
    if (!this.props.data.has('decorations') && nextProps.data.has('decorations') && !nextProps.loading) {
      nextProps.setStep(1);
      // Set decoration to the easily accesible prop
      nextProps.setNewDecoration(nextProps.data.get('decorations').first().toJS());
      // Move stepper
    }
  }

  handleSubmit(vals) {
    const values = vals.toJSON();
    // Add bookId reference
    values.booksID = this.props.bookId;
    // Check if this decoration is supposed to be sub decoration
    if (this.props.decorationId > -1) {
      // Add parent decoration reference
      values.decorationsId = this.props.decorationId;
    }
    this.props.create(DecorationModel, values);
  }

  render() {
    const { props } = this;
    return (
      <div>
        {!props.loading && props.data.has('categories') &&
          <ReduxForm onSubmit={this.handleSubmit} categories={props.data.get('categories').toJS()} />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading,
  data,
  createFailed,
  createId,
});

const mapDispatchToProps = dispatch => ({
  redirect: (location = '/') => dispatch(push(location)),
  setStep: stepIndex => dispatch(setStep(stepIndex)),
  setNewDecoration: newDecoration => dispatch(setNewDecoration(newDecoration)),
  fetch: (model, params) => dispatch(fetch(model, params)),
  create: (model, vals) => dispatch(create(model, vals)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DecorationAddInfo);
