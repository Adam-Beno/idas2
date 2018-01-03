import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import LocationIcon from 'material-ui-icons/LocationOn';
import LanguageIcon from 'material-ui-icons/Language';
import PageNumberIcon from 'material-ui-icons/FormatListNumbered';
import BarcodeIcon from 'material-ui-icons/ViewHeadline';
import BookIcon from 'material-ui-icons/Book';

import { fetchBook } from './actions';
import { book, loading } from './selectors';

import styles from './styles';

class Detail extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    fetchBook: propTypes.func.isRequired,
    book: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
  };

  componentWillMount() {
    const id = Number(this.props.match.params.id);
    this.props.fetchBook(id);
  }

  render() {
    const { props: { classes, data }, props } = this;
    console.log(props);
    return (
      <div>
        {(!props.loading) ? (
          <div>
            <Typography type="display1" gutterBottom>
              {props.book.get('name')}
            </Typography>
            <Typography type="subheading" gutterBottom>
              Written by {props.book.get('authorName')} published in {props.book.get('yearOfIssue') || props.book.get('periodOfIssue')}
            </Typography>
            <div className={classes.chipRow}>
              <Chip
                avatar={
                  <Avatar>
                    <LocationIcon />
                  </Avatar>
                }
                label={props.book.get('placeOfIssue')}
                className={classes.chip}
              />
              <Chip
                avatar={
                  <Avatar>
                    <LanguageIcon />
                  </Avatar>
                }
                label={props.book.get('language')}
                className={classes.chip}
              />
              <Chip
                avatar={
                  <Avatar>
                    <PageNumberIcon />
                  </Avatar>
                }
                label={`${props.book.get('numberOfPages')} pages`}
                className={classes.chip}
              />
              <Chip
                avatar={
                  <Avatar>
                    <BarcodeIcon className={classes.barcode} />
                  </Avatar>
                }
                label={props.book.get('barcode')}
                className={classes.chip}
              />
              <Chip
                avatar={
                  <Avatar>
                    <BookIcon />
                  </Avatar>
                }
                label={props.book.get('signature')}
                className={classes.chip}
              />
            </div>
            <br />
            <Grid container>
              <Grid item xs={12} sm={12} lg={8}>
                <Typography type="headline">
                  Description
                </Typography>
                <Typography type="body2">
                  {props.book.get('description')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <img src={props.book.get('photo')} alt={props.book.get('imageName')} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="headline">
                  Decorations
                </Typography>
              </Grid>
            </Grid>
          </div>
        ) : (
            <div>
              Loading..
          </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  book,
  loading,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetchBook: id => dispatch(fetchBook(id)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Detail);

