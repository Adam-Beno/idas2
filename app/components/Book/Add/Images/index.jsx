import React, { Component } from 'react';
import propTypes, { element } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _find from 'lodash/find';
import _toLower from 'lodash/toLower';
import toBuffer from 'blob-to-buffer';
import fs from 'fs';
import _forEach from 'lodash/forEach';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Input, { InputLabel } from 'material-ui/Input';

import knex from '../../../../utils/knex';
import DropZone from '../../../DropFiles';
import { setData, setInfo, dropFiles } from '../actions';
import { info, files, newBookId } from '../selectors';
import styles from './styles';

class Images extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    info: propTypes.object.isRequired, // eslint-disable-line
    dropFiles: propTypes.func.isRequired, // eslint-disable-line
    files: propTypes.object.isRequired, // eslint-disable-line
    newBookId: propTypes.number.isRequired, // eslint-disable-line
    handleFilesDrop: propTypes.func.isRequired,
    bookId: propTypes.number.isRequired,
  };

  constructor() {
    super();

    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(f) {
    _forEach(f, (ele) => {
      toBuffer(ele, (err, buffer) => {
        if (err) throw err;
        const scan = {
          booksId: this.props.bookId,
          name: ele.name,
          photo: buffer,
        };
        this.props.handleFilesDrop(scan);
      });
    });
    this.props.dropFiles([f[0]]);
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div className={classes.root}>
        {props.files.size > 0 ? (
          <GridList className={classes.gridList} cols={2.5}>
            {_map(props.files.toJS(), tile => (
              <GridListTile key={tile.lastModified}>
                <img src={tile.preview} alt={tile.name} />
              </GridListTile>
            ))}
          </GridList>) : (
            <p>waiting for pics</p>
          )
        }
        <DropZone handleDrop={this.handleDrop} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  info,
  files,
  newBookId
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    dropFiles: f => dispatch(dropFiles(f)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Images);
