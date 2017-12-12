import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from 'material-ui/Grid';

import Book from './Book';

const book = {
  id: 1235614,
  name: 'Lorem ipsum',
  authorName: 'Joseph Kyrst',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor ante non aliquet accumsan. Sed lobortis elit et iaculis dignissim. Vivamus dignissim commodo sapien, vel fringilla neque luctus vel. Maecenas lacinia lectus ut maximus maximus. Aliquam sed ligula eget nunc venenatis tristique et non tellus. Donec feugiat iaculis mi, at accumsan nisi pharetra sed. Etiam mi magna, consectetur eu tristique ac, mollis quis leo. Mauris nisi purus, faucibus eu tincidunt eget, elementum non nulla. Donec nec metus sagittis, mattis justo a, eleifend mi. Vivamus blandit elit tellus. Nulla non elit vitae elit luctus aliquam non ac augue.',
  image: 'https://i.pinimg.com/736x/9a/75/e4/9a75e49b6eff4870e04549e980291775--art-of-books-book-art.jpg',
  imageName: 'Book',
  dateOfIssue: 1464,
  placeOfIssue: 'Prague',
  language: 'Czech',
  barcode: 78965478,
  signature: 'ESB-8488',
  pages: 135,
};

const home = class Home extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item lg={4} sm={6} xs={12}>
            <Book data={book} />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Book data={book} />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default home;
