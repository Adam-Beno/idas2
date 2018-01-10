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
import Button from 'material-ui/Button';

import ModeEditIcon from 'material-ui-icons/ModeEdit';
import LocationIcon from 'material-ui-icons/LocationOn';
import AddIcon from 'material-ui-icons/Add';
import LanguageIcon from 'material-ui-icons/Language';
import PageNumberIcon from 'material-ui-icons/FormatListNumbered';
import BarcodeIcon from 'material-ui-icons/ViewHeadline';
import BookIcon from 'material-ui-icons/Book';
import InfoIcon from 'material-ui-icons/Info';
import BackIcon from 'material-ui-icons/NavigateBefore';

import { setTileId } from './actions';
import { tileId } from './selectors';

import { fetch, clear } from '../../crud/actions';
import { data, loading } from '../../crud/selectors';

import { authenticated } from '../User/selectors';

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
    authenticated: propTypes.object.isRequired,
    redirect: propTypes.func.isRequired,
    clear: propTypes.func.isRequired,
    setTileId: propTypes.func.isRequired,
    tileId: propTypes.number.isRequired,
  };

  constructor() {
    super();

    this.handleBack = this.handleBack.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubcategoryRedirect = this.handleSubcategoryRedirect.bind(this);
  }

  componentWillMount() {
    this.props.clear();
    const id = Number(this.props.match.params.id);
    this.props.fetch(DecorationPreviewModel, { decorationsId: id });
    this.props.fetch(DecorationModel, { id });
    this.props.fetch(ScanModel, { decorationsId: id });
    this.props.fetch(PainterModel, { decorationsId: id });
    this.props.fetch(PlacementModel, { decorationsId: id });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tileId !== nextProps.tileId) {
      const id = nextProps.tileId;
      this.props.fetch(DecorationPreviewModel, { decorationsId: id });
      this.props.fetch(DecorationModel, { id });
      this.props.fetch(ScanModel, { decorationsId: id });
      this.props.fetch(PainterModel, { decorationsId: id });
      this.props.fetch(PlacementModel, { decorationsId: id });
    }
  }

  componentWillUnmount() {
    this.props.setTileId(-1);
    this.props.clear();
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleAdd() {
    const booksId = this.props.data.get('decorations').first().toJS().booksId;
    const decorationsId = this.props.data.get('decorations').first().toJS().id;
    if (decorationsId !== null) {
      this.props.redirect(`/decoration/add/${booksId}/${decorationsId}`);
    } else {
      this.props.redirect(`/decoration/add/${booksId}`);
    }
  }

  handleSubcategoryRedirect(id) {
    this.props.clear();
    this.props.setTileId(id);
  }

  render() {
    const { props: { classes, data }, props } = this;
    return (
      <div className={classes.root}>
        {(!props.loading) ? (
          <div>
            {props.authenticated.id && props.data.has('decorations') &&
              <div>
                <Button fab color="accent" aria-label="edit" className={classes.editButton}>
                  <ModeEditIcon />
                </Button>
                <Button fab color="primary" aria-label="edit" className={classes.addButton} onClick={this.handleAdd}>
                  <AddIcon />
                </Button>
              </div>}
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
                      <GridListTile key={tile.id} className={classes.gridListTile} onClick={() => this.handleSubcategoryRedirect(tile.id)}>
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
  loading,
  authenticated,
  tileId,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    fetch: (model, params) => dispatch(fetch(model, params)),
    clear: () => dispatch(clear()),
    setTileId: id => dispatch(setTileId(id)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Decoration);

