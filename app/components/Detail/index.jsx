import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import { CircularProgress } from 'material-ui/Progress';


import LocationIcon from 'material-ui-icons/LocationOn';
import LanguageIcon from 'material-ui-icons/Language';
import PageNumberIcon from 'material-ui-icons/FormatListNumbered';
import BarcodeIcon from 'material-ui-icons/ViewHeadline';
import BookIcon from 'material-ui-icons/Book';
import InfoIcon from 'material-ui-icons/Info';

import { fetchBook } from './actions';
import { book, loading } from './selectors';

import { fetch } from '../../crud/actions';
import { data, loading as crudLoading } from '../../crud/selectors';

import DecorationPreviewModel from '../../models/decorationPreview';

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
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    crudLoading: propTypes.bool.isRequired,
  };

  componentWillMount() {
    const id = Number(this.props.match.params.id);
    this.props.fetchBook(id);
    this.props.fetch(DecorationPreviewModel, { booksId: id });
  }

  render() {
    const { props: { classes, data }, props } = this;
    console.log(props);
    return (
      <div className={classes.root}>
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
                <img src={props.book.get('photo')} alt={props.book.get('imageName')} className={classes.thumbnail} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="headline">
                  Decorations
                </Typography>
                <br />
                {props.data.has('decorationWithScan') && !props.data.loading &&
                <GridList cellHeight={280} className={classes.gridList} cols={4} spacing={24}>
                  {props.data.get('decorationWithScan').toJS().map(tile => (
                    <GridListTile key={tile.id} className={classes.gridListTile} onClick={() => props.redirect(`/decoration/show/${tile.id}`)}>
                      <img src={tile.photo} alt={tile.name} />
                      <GridListTileBar
                        title={tile.name}
                        subtitle={<span>by: {tile.nickname}</span>}
                      />
                    </GridListTile>
                  ))}
                </GridList> }
              </Grid>
            </Grid>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  book,
  loading,
  crudLoading,
  data,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    fetchBook: id => dispatch(fetchBook(id)),
    fetch: (model, params) => dispatch(fetch(model, params)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Detail);

