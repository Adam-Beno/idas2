import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import styles from './styles';
import { update, fetch } from '../../../crud/actions';
import { loading, data } from '../../../crud/selectors';

import Model from '../../../models/printer';

import EditForm from './form';

class PrinterAdd extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    update: propTypes.func.isRequired,
    fetch: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    data: propTypes.object.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);
    this.props.fetch(Model, { id });
  }

  handleSubmit(vals) {
    this.props.update(Model, vals.toJSON());
    this.props.redirect('/printers');
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Edit printer
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            {(!props.loading && props.data.has('printers')) &&
              <EditForm onSubmit={this.handleSubmit} initialValues={props.data.get('printers').first()} />}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading,
  data,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    update: (model, values) => dispatch(update(model, values)),
    fetch: (model, params) => dispatch(fetch(model, params)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(PrinterAdd);
