import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _find from 'lodash/find';
import _toLower from 'lodash/toLower';
import toBuffer from 'blob-to-buffer';
import fs from 'fs';
import _forEach from 'lodash/forEach';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import styles from './styles';

import DropZone from '../../../../DropFiles';
import { fetch, update } from '../../../../../crud/actions';
import { data, loading } from '../../../../../crud/selectors';
import ScanModel from '../../../../../models/scan';

class ThumbnailTab extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    bookId: propTypes.number.isRequired,
    data: propTypes.object.isRequired, // eslint-disable-line
    fetch: propTypes.func.isRequired,
    update: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired, // eslint-disable-line
  }

  constructor() {
    super();

    this.handleDrop = this.handleDrop.bind(this);
  }

  componentWillMount() {
    this.props.fetch(ScanModel, { booksId: this.props.bookId });
  }

  handleDrop(f) {
    _forEach(f, (ele) => {
      toBuffer(ele, (err, buffer) => {
        if (err) throw err;
        const scan = {
          id: this.props.data.get('scans').first().toJS().id,
          booksId: this.props.bookId,
          name: ele.name,
          photo: buffer,
        };
        this.props.update(ScanModel, scan, { booksId: this.props.bookId });
      });
    });
  }


  render() {
    const { props: { classes }, props } = this;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={4} className={classes.spinnerRoot}>
          {(!props.loading && props.data.has('scans')) ? (
            <img className={classes.image} src={ScanModel.convertImage(props.data.get('scans').first().toJS()).photo} alt={props.data.get('scans').first().toJS().name} height={250} />
          ) : (
            <CircularProgress className={classes.progress} />
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <DropZone handleDrop={this.handleDrop} />
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  data,
  loading,
});

const mapDispatchToProps = dispatch => ({
  fetch: (model, params) => dispatch(fetch(model, params)),
  update: (model, vals, params) => dispatch(update(model, vals, params)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ThumbnailTab);

