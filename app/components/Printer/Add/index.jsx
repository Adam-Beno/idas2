import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _snakeCase from 'lodash/snakeCase';
import _mapKeys from 'lodash/mapKeys';
import _toUpper from 'lodash/toUpper';
import _omit from 'lodash/omit';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import knex from '../../../utils/knex';
import styles from './styles';
import { CREATE_PRINTERS_SUCCEEDED } from '../constants';
import { create } from '../../../crud/actions';
import { loading } from '../../../crud/selectors';
import Model from '../../../models/printer';


import AddForm from './form';

class PrinterAdd extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    create: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading && !nextProps.loading) {
      this.props.redirect('/printers');
    }
  }

  handleSubmit(vals) {
    this.props.create(Model, CREATE_PRINTERS_SUCCEEDED, vals.toJSON());
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Add new printer
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <AddForm onSubmit={this.handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    create: (model, constant, data) => dispatch(create(model, constant, data)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(PrinterAdd);
