import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import Card, { CardHeader, CardContent } from 'material-ui/Card';


import LocationIcon from 'material-ui-icons/LocationOn';
import LanguageIcon from 'material-ui-icons/Language';
import PageNumberIcon from 'material-ui-icons/FormatListNumbered';
import BarcodeIcon from 'material-ui-icons/ViewHeadline';
import BookIcon from 'material-ui-icons/Book';
import InfoIcon from 'material-ui-icons/Info';
import BackIcon from 'material-ui-icons/NavigateBefore';

import { fetch } from '../../crud/actions';
import { data, loading } from '../../crud/selectors';

import DecorationPreviewModel from '../../models/decorationPreview';
import ScanModel from '../../models/scan';
import DecorationModel from '../../models/decoration';
import PainterModel from '../../models/painter';
import PlacementModel from '../../models/placement';

import styles from './styles';

class Decoration extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: propTypes.object.isRequired,
    fetch: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);
    this.props.fetch(DecorationPreviewModel, { decorationsId: id });
    this.props.fetch(DecorationModel, { id });
    this.props.fetch(ScanModel, { decorationsId: id });
    this.props.fetch(PainterModel, { decorationsId: id });
    this.props.fetch(PlacementModel, { decorationsId: id });
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
              Decoration -&nbsp;
              {props.data.has('decorations') &&
                <span>{props.data.get('decorations').first().toJS().name}</span>
              }
            </Typography>
            <Typography type="caption">
              Painted by
              {props.data.has('painters') &&
                <span> {props.data.get('painters').first().toJS().name} {props.data.get('painters').first().toJS().nickname} {props.data.get('painters').first().toJS().surname}</span>
              }
            </Typography>
            <br />
            <Grid container spacing={24}>
              <Grid item xs={12} sm={4} lg={4}>
                <Card>
                  <CardHeader
                    title="Decoration info"
                  />
                  <CardContent>
                    <Typography type="display1">
                      Width:
                      {props.data.has('decorations') &&
                        <span> {props.data.get('decorations').first().toJS().width}mm</span>
                      }
                    </Typography>
                    <Typography type="display1">
                      Height:
                      {props.data.has('decorations') &&
                        <span> {props.data.get('decorations').first().toJS().height}mm</span>
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <Card>
                  <CardHeader
                    title="Placement"
                  />
                  <CardContent>
                    <Typography type="display1">
                      X:
                      {props.data.has('placements') &&
                        <span> {props.data.get('placements').first().toJS().x}</span>
                      }
                    </Typography>
                    <Typography type="display1">
                      Y:
                      {props.data.has('placements') &&
                        <span> {props.data.get('placements').first().toJS().y}</span>
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br />
            <Grid container>
              <Grid item xs={12} >
                <Typography type="headline">
                  Subdecorations
                </Typography>
                <br />
                {props.data.has('decorationWithScan') && !props.data.loading &&
                  <GridList cellHeight={280} className={classes.gridList} cols={4} spacing={24}>
                    {props.data.get('decorationWithScan').toJS().map(tile => (
                      <GridListTile key={tile.id} className={classes.gridListTile} onClick={() => props.redirect(`/decoration/${tile.id}`)}>
                        <img src={tile.photo} alt={tile.name} />
                        <GridListTileBar
                          title={tile.name}
                          subtitle={<span>by: {tile.nickname}</span>}
                        />
                      </GridListTile>
                    ))}
                  </GridList>}
              </Grid>
              <Grid item xs={12}>
                <Typography type="headline">
                  Photos
                </Typography>
                <br />
                {props.data.has('scans') && !props.data.loading &&
                  <GridList cellHeight={240} className={classes.gridList} cols={6} spacing={8}>
                    {props.data.get('scans').toJS().map(tile => (
                      <GridListTile key={tile.id} cols={1}>
                        <img src={tile.photo} alt={tile.name} />
                      </GridListTile>
                    ))}
                  </GridList>}
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
  data,
  loading
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    fetch: (model, params) => dispatch(fetch(model, params)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Decoration);

