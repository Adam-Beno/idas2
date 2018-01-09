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
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';


import LocationIcon from 'material-ui-icons/LocationOn';
import LanguageIcon from 'material-ui-icons/Language';
import PageNumberIcon from 'material-ui-icons/FormatListNumbered';
import BarcodeIcon from 'material-ui-icons/ViewHeadline';
import BookIcon from 'material-ui-icons/Book';
import InfoIcon from 'material-ui-icons/Info';
import BackIcon from 'material-ui-icons/NavigateBefore';

import { fetchBook } from './actions';
import { book, loading } from './selectors';

import styles from './styles';

const tileData = [
  {
    img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg',
    title: 'Zima',
    author: 'Jarn Kovl',
    cols: 2,
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png',
    title: 'Léto',
    author: 'Martin Kýžský',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/01/16/19/54/soap-bubble-1985092_960_720.jpg',
    title: 'Podzim',
    author: 'Catherin Lei',
  },
];

class Decoration extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor() {
    super();

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    const { props: { classes, data }, props } = this;
    return (
      <div className={classes.root}>
        {(!props.loading) ? (
          <div>
            <Typography type="display1" gutterBottom>
              <IconButton aria-label="Back" onClick={this.handleBack}>
                <BackIcon />
              </IconButton>
              Decoration
            </Typography>
            <div className={classes.chipRow}>
              <Chip
                label="Zima"
                className={classes.chip}
              />
              <Chip
                label="Listí"
                className={classes.chip}
              />
              <Chip
                label="Slunečno"
                className={classes.chip}
              />
            </div>
            <br />
            <Grid container>
              <Grid item xs={12} >
                <Typography type="headline">
                  Subdecorations
                </Typography>
                <br />
                <GridList cellHeight={280} className={classes.gridList} cols={4} spacing={24}>
                  {tileData.map(tile => (
                    <GridListTile key={tile.img} className={classes.gridListTile} onClick={() => props.redirect(`/decoration/${tile.id}`)}>
                      <img src={tile.img} alt={tile.title} />
                      <GridListTileBar
                        title={tile.title}
                        subtitle={<span>by: {tile.author}</span>}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
              <Grid item xs={12}>
                <Typography type="headline">
                  Photos
                </Typography>
                <br />
                <GridList cellHeight={240} className={classes.gridList} cols={6} spacing={8}>
                  {tileData.map(tile => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                      <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                  ))}
                </GridList>
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
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Decoration);

