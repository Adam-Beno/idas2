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
import { fetchAuthor, updateAuthor } from '../actions';
import { author, loading } from '../selectors';

import EditForm from './form';

class AuthorEdit extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    fetchAuthor: propTypes.func.isRequired,
    updateAuthor: propTypes.func.isRequired,
    author: propTypes.object.isRequired, // eslint-disable-line
    loading: propTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchAuthor(Number(this.props.match.params.id));
  }

  handleSubmit(vals) {
    this.props.updateAuthor(vals.toJSON());
    this.props.redirect('/authors');
  }

  render() {
    const { props: { classes }, props } = this;
    console.log(props.author);
    return (
      <div>
        <Typography type="title" gutterBottom>
          Edit author - {props.author.toJSON().nickname}
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            {!props.loading &&
            <EditForm onSubmit={this.handleSubmit} initialValues={props.author} />}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  author,
  loading,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetchAuthor: id => dispatch(fetchAuthor(id)),
    updateAuthor: data => dispatch(updateAuthor(data)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AuthorEdit);
