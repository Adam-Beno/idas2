import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import styles from './styles';
import Book from './Book';
import { fetchBooks } from './actions';
import { books, fetchFailed } from './selectors';

import { showNotification } from '../Notification/actions';

class Home extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    books: propTypes.object.isRequired,
    fetchBooks: propTypes.func.isRequired,
    fetchFailed: propTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchBooks();
  }

  handleButtonClick() {
    this.props.fetchBooks();
  }

  render() {
    const { props } = this;
    return (
      <div className={props.classes.root}>
        {!props.fetchFailed > 0 ? (
          <Grid container>
            {_map(props.books.toJS(), (val, key) => (
              <Grid item lg={4} sm={6} xs={12} key={key}>
                <Book data={val} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div>
            <CircularProgress />
            <br />
            <Button onClick={this.handleButtonClick}>Try again</Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  books,
  fetchFailed,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    fetchBooks: () => dispatch(fetchBooks()),
    showNotification: message => dispatch(showNotification(message)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
