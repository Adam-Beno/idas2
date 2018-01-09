import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _mapKeys from 'lodash/mapKeys';
import _toUpper from 'lodash/toUpper';
import _snakeCase from 'lodash/snakeCase';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import styles from './styles';
import { nextStep, completed, setNewBookId, setFormData, setFilesData } from './actions';
import { step, info, files, newBookId } from './selectors';

import InfoComponent from './Info';
import ImageComponent from './Images';
import knex from '../../../utils/knex';

import { create } from '../../../crud/actions';
import { createId, createFailed, loading } from '../../../crud/selectors';
import BookModel from '../../../models/book';
import ScanModel from '../../../models/scan';

function getSteps() {
  return ['Fill in the book details', 'Add thumbnail photo'];
}

class BookAdd extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    nextStep: propTypes.func.isRequired, // eslint-disable-line
    completed: propTypes.func.isRequired, // eslint-disable-line
    setNewBookId: propTypes.func.isRequired, // eslint-disable-line
    step: propTypes.number.isRequired, // eslint-disable-line
    info: propTypes.object.isRequired, // eslint-disable-line
    files: propTypes.object.isRequired, // eslint-disable-line
    setFilesData: propTypes.func.isRequired,
    setFormData: propTypes.func.isRequired,
    createId: propTypes.number.isRequired,
    create: propTypes.func.isRequired,
    createFailed: propTypes.bool.isRequired,
    loading: propTypes.bool.isRequired,
    newBookId: propTypes.number.isRequired,
  };

  constructor() {
    super();

    this.getStepContent = this.getStepContent.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFilesDrop = this.handleFilesDrop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.createFailed) {
      nextProps.completed();
    }
    if (!nextProps.createFailed && nextProps.createId !== -1 && nextProps.files.size > 0 && !nextProps.loading) {
      this.props.redirect(`/books/edit/${nextProps.newBookId}`);
      this.props.completed();
    }
    if (!nextProps.createFailed && nextProps.createId !== -1 && nextProps.newBookId === -1) {
      this.props.setNewBookId(nextProps.createId);
    }
  }

  handleFormSubmit(vals) {
    this.props.create(BookModel, vals.toJSON());
    this.props.nextStep();
  }

  handleFilesDrop(file) {
    this.props.create(ScanModel, file);
  }

  getStepContent(index) {
    switch (index) {
      case 0:
        return (<InfoComponent handleSubmit={this.handleFormSubmit} />);
      case 1:
        return (<ImageComponent handleFilesDrop={this.handleFilesDrop} bookId={this.props.createId} />);
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { props: { classes }, props } = this;
    const steps = getSteps();

    return (
      <div>
        <Typography type="title" gutterBottom>
          Add new book
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <Stepper activeStep={props.step} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <div>{this.getStepContent(index)}</div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  step,
  info,
  files,
  createId,
  createFailed,
  loading,
  newBookId,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    nextStep: () => dispatch(nextStep()),
    completed: () => dispatch(completed()),
    setNewBookId: id => dispatch(setNewBookId(id)),
    setFilesData: data => dispatch(setFilesData(data)),
    setFormData: data => dispatch(setFormData(data)),
    create: (model, data) => dispatch(create(model, data)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(BookAdd);
