import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';

import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import Book from './Book';
import { fetchBooks } from './actions';
import { books } from './selectors';

import { showNotification } from '../../actions/notification';

class Home extends Component {
  static propTypes = {
    books: propTypes.object.isRequired,
    fetchBooks: propTypes.func.isRequired,
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
      <div>
        {props.books.size > 0 ? (
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
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetchBooks: () => dispatch(fetchBooks()),
    showNotification: message => dispatch(showNotification(message)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
