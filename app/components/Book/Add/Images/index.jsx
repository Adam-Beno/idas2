import React, { Component } from 'react';
import propTypes, { element } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _find from 'lodash/find';
import _toLower from 'lodash/toLower';
import DropZone from 'react-dropzone';
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
  };

  async handleDrop(f) {
    _forEach(f, (ele) => {
      toBuffer(ele, (err, buffer) => {
        if (err) throw err;

        const photo = {
          NAME: f[0].name,
          PHOTO: buffer,
          BOOK_ID: this.props.newBookId,
        };

        knex('SCAN').insert(photo).then((r) => {
          this.props.dropFiles(f);
          return r;
        }).catch(e => console.log(e));
      });
    });
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div className={classes.root}>
        {props.files.length > 0 ? (
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
        <DropZone className={classes.drop} onDrop={this.handleDrop.bind(this)}>
          <p>Drop files here, or click to select file upload</p>
        </DropZone>
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
    redirect: (location = '/') => dispatch(replace(location)),
    dropFiles: f => dispatch(dropFiles(f)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Images);
