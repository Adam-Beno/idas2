import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';
import _camelCase from 'lodash/camelCase';

import Grid from 'material-ui/Grid';

import Book from './Book';
import knex from '../../utils/knex';
import { getBooks } from './actions';
import { books } from './selectors';

const home = class Home extends Component {
  static propTypes = {
    books: propTypes.array.isRequired, // eslint-disable-line
    getBooks: propTypes.func.isRequired, // eslint-disable-line
  };

  async componentWillMount() {
    let result = await knex.raw('SELECT * FROM ( SELECT  b.ID, b.NAME, b.BARCODE, S.PHOTO, a.NAME || \' \' || a.SURNAME AS AUTHOR_NAME, b.PERIOD_OF_ISSUE, b.YEAR_OF_ISSUE, b.DESCRIPTION, ROW_NUMBER() OVER (PARTITION BY b.ID ORDER BY s.BOOK_ID DESC) AS rn FROM BOOK b JOIN SCAN s ON b.ID = s.BOOK_ID JOIN AUTHOR a ON b.AUTHOR_ID = a.ID) WHERE rn = 1');
    result = _map(result, (item) => _mapKeys(item, (val, key) => _camelCase(key)));
    result = _map(result, (item) => _mapValues(item, (val, key) => {
      if (key === 'photo') {
        const buff = new Buffer(val);
        return `data:image/jpeg;base64,${buff.toString('base64')}`;
      }
      return val;
    }));
    this.props.getBooks(result);
  }

  render() {
    const { props } = this;
    return (
      <div>
        {props.books.length > 0 ? (
          <Grid container>
            {_map(props.books, (val, key) => (
              <Grid item lg={4} sm={6} xs={12} key={key}>
                <Book data={val} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div>loading</div>
        )}
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  books,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    getBooks: (b) => dispatch(getBooks(b)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(home);
