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

const book = {
  id: 1235614,
  name: 'Lorem ipsum',
  authorName: 'Joseph Kyrst',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor ante non aliquet accumsan. Sed lobortis elit et iaculis dignissim. Vivamus dignissim commodo sapien, vel fringilla neque luctus vel. Maecenas lacinia lectus ut maximus maximus. Aliquam sed ligula eget nunc venenatis tristique et non tellus. Donec feugiat iaculis mi, at accumsan nisi pharetra sed. Etiam mi magna, consectetur eu tristique ac, mollis quis leo. Mauris nisi purus, faucibus eu tincidunt eget, elementum non nulla. Donec nec metus sagittis, mattis justo a, eleifend mi. Vivamus blandit elit tellus. Nulla non elit vitae elit luctus aliquam non ac augue.',
  photo: 'https://i.pinimg.com/736x/9a/75/e4/9a75e49b6eff4870e04549e980291775--art-of-books-book-art.jpg',
  imageName: 'Book',
  dateOfIssue: 1464,
  placeOfIssue: 'Prague',
  language: 'Czech',
  barcode: 78965478,
  signature: 'ESB-8488',
  pages: 135,
};

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
