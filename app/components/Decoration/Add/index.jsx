import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';

import styles from './styles';
import { setStep } from '../actions';
import { step, decoration } from '../selectors';

import DecorationInfoStep from './steps/DecorationInfo';
import MotivesStep from './steps/Motives';
import PaintersStep from './steps/Painters';
import PlacementsStep from './steps/Placements';
import ScansStep from './steps/Scans';


class DecorationAdd extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        bookId: propTypes.string.isRequired,
        decorationId: propTypes.string,
      }),
    }).isRequired,
    setStep: propTypes.func.isRequired,
    step: propTypes.number.isRequired,
    decoration: propTypes.object.isRequired,
  }

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    const { props: { classes, match }, props } = this;
    return (
      <div>
        <Typography type="display1">
          Add new decoration
        </Typography>
        <br />
        <AppBar position="static" color="default">
          <Stepper activeStep={props.step} alternativeLabel className={classes.stepperRoot}>
            <Step>
              <StepLabel>Decoration Info</StepLabel>
            </Step>
            <Step>
              <StepLabel>Motives</StepLabel>
            </Step>
            <Step>
              <StepLabel>Painters</StepLabel>
            </Step>
            <Step>
              <StepLabel>Placements</StepLabel>
            </Step>
            <Step>
              <StepLabel>Scans</StepLabel>
            </Step>
          </Stepper>
        </AppBar>
        <Paper className={classes.paperRoot}>
          {props.step === 0 &&
            <DecorationInfoStep
              bookId={Number(match.params.bookId)}
              decorationId={Number(match.params.decorationId) || -1}
            />}
          {(props.step === 1) && <MotivesStep decoration={props.decoration.toJS()} />}
          {props.step === 2 && <PaintersStep decoration={props.decoration.toJS()} />}
          {props.step === 3 && <PlacementsStep decoration={props.decoration.toJS()} />}
          {props.step === 4 && <ScansStep decoration={props.decoration.toJS()} />}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  step,
  decoration,
});

const mapDispatchToProps = dispatch => ({
  redirect: (location = '/') => dispatch(push(location)),
  setStep: nextStep => dispatch(setStep(nextStep)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DecorationAdd);
