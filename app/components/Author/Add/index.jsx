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
import { createAuthor } from '../actions';

import AddAuthorForm from './form';

class Author extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    createAuthor: propTypes.func.isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.createAuthor(values.toJSON());
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
            <AddAuthorForm onSubmit={this.handleSubmit} />
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
    redirect: (location = '/') => dispatch(replace(location)),
    createAuthor: (data) => dispatch(createAuthor(data)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Author);
