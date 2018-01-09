import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _snakeCase from 'lodash/snakeCase';
import _mapKeys from 'lodash/mapKeys';
import _toUpper from 'lodash/toUpper';
import _omit from 'lodash/omit';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import styles from './styles';
import { create } from '../../../crud/actions';
import Model from '../../../models/printer';

import AddForm from './form';

class PrinterAdd extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    create: propTypes.func.isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(vals) {
    this.props.create(Model, vals.toJSON());
    this.props.redirect('/printers');
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
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    create: (model, data) => dispatch(create(model, data)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(PrinterAdd);
