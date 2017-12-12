import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _snakeCase from 'lodash/snakeCase';
import _mapKeys from 'lodash/mapKeys';
import _toUpper from 'lodash/toUpper';

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

const author = class Author extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    values: propTypes.object, // eslint-disable-line
    editValue: propTypes.func.isRequired,
    clearStore: propTypes.func.isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const formData = _mapKeys(this.props.values.toJS(), (value, key) => _toUpper(_snakeCase(key)));
    await knex('AUTHOR').insert(formData);
    this.props.clearStore();
    this.props.redirect('/authors');
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Add new author
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>

            <form id="authorForm" className={classes.container} noValidate autoComplete="off">
              <Grid container>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    name="firstName"
                    label="First name"
                    className={classes.textField}
                    onChange={(e) => props.editValue('name', e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    name="artisticName"
                    label="Artistic name"
                    className={classes.textField}
                    onChange={(e) => props.editValue('nickname', e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    name="lastName"
                    label="Last name"
                    className={classes.textField}
                    onChange={(e) => props.editValue('surname', e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    name="age"
                    label="Age"
                    className={classes.textField}
                    onChange={(e) => props.editValue('age', e.target.value, 'number')}
                    margin="normal"
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    name="genre"
                    label="Genre"
                    className={classes.textField}
                    onChange={(e) => props.editValue('genre', e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button raised color="primary" className={classes.button} onClick={this.handleSubmit}>
                ADD NEW AUTHOR
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
};

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
)(author);
