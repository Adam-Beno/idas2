import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import knex from '../../../utils/knex';
import styles from './styles';
import { editValue, clearStore } from './actions';
import { values } from './selectors';
import ReduxForm from './form';

class MotiveAdd extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    values: propTypes.object, // eslint-disable-line
    editValue: propTypes.func.isRequired, // eslint-disable-line
    clearStore: propTypes.func.isRequired, // eslint-disable-line
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(vals) {
    /*
    const formData = _mapKeys(this.props.values.toJS(), (value, key) => _toUpper(_snakeCase(key)));
    await knex('MOTIVE').insert(_omit(formData, ['DATA', 'VALUES']));
    this.props.clearStore();
    this.props.redirect('/motives');
    */
    console.log(vals);
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Add new motive
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>

            <form id="categoryForm" className={classes.container} noValidate autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Name"
                    className={classes.textField}
                    onChange={(e) => props.editValue('name', e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    multiline
                    className={classes.textField}
                    onChange={(e) => props.editValue('description', e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button raised color="primary" className={classes.button} onClick={this.handleSubmit}>
                ADD NEW MOTIVE
              </Button>
            </form>
            <ReduxForm handleSubmit={this.handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  values,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    editValue: (key, value, kind = 'string') => dispatch(editValue(key, value, kind)),
    clearStore: () => dispatch(clearStore()),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MotiveAdd);
