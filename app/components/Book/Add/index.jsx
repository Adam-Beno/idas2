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
import { nextStep, completed, setNewBookId } from './actions';
import { step, info, files } from './selectors';

import InfoComponent from './Info';
import ImageComponent from './Images';
import knex from '../../../utils/knex';


function getSteps() {
  return ['Fill in the book details', 'Add thumbnail photo'];
}

function getStepContent(index) {
  switch (index) {
    case 0:
      return (<InfoComponent />);
    case 1:
      return (<ImageComponent />);
    default:
      return 'Unknown step';
  }
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
    files: propTypes.array.isRequired, // eslint-disable-line
  };

  constructor() {
    super();

    this.handleNextStep = this.handleNextStep.bind(this);
  }

  async handleNextStep() {
    if (this.props.step === 0) {
      const bookInfo = _mapKeys(this.props.info.toJS(), (value, key) => _toUpper(_snakeCase(key)));
      const newBookId = await knex('BOOK').returning('ID').insert(bookInfo);
      this.props.setNewBookId(Number(newBookId[0]));
      this.props.nextStep();
    } else if (this.props.step === 1) {
      // save pictures

      this.props.completed();
      this.props.redirect('/books');
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
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <div>{getStepContent(index)}</div>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            raised
                            color="primary"
                            onClick={() => this.handleNextStep()}
                            className={classes.button}
                          >
                            {props.step === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
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
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    nextStep: () => dispatch(nextStep()),
    completed: () => dispatch(completed()),
    setNewBookId: id => dispatch(setNewBookId(id)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(BookAdd);
