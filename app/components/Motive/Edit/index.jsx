import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';


import styles from './styles';
import { update, fetch } from '../../../crud/actions';
import { data, loading } from '../../../crud/selectors';
import Model from '../../../models/motive';

import EditForm from './form';

class MotiveEdit extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    fetch: propTypes.func.isRequired,
    update: propTypes.func.isRequired,
    data: propTypes.object.isRequired, // eslint-disable-line
    loading: propTypes.bool.isRequired,
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
    this.props.redirect('/motives');
  }

  render() {
    const { props: { classes }, props } = this;

    console.log(props);
    return (
      <div>
        <Typography type="title" gutterBottom>
          Edit motive
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            {(!props.loading && props.data.has('motives')) &&
            <EditForm onSubmit={this.handleSubmit} initialValues={props.data.get('motives').first()} />}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data,
  loading,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetch: id => dispatch(fetch(id)),
    update: (model, vals) => dispatch(update(model, vals)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MotiveEdit);
