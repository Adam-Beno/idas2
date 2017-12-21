import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _find from 'lodash/find';
import _toLower from 'lodash/toLower';

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
import Input, { InputLabel } from 'material-ui/Input';

import knex from '../../../../utils/knex';
import { setData, setInfo } from '../actions';
import { data, info } from '../selectors';

class Info extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    setData: propTypes.func.isRequired,
    data: propTypes.object.isRequired, // eslint-disable-line
    setInfo: propTypes.func.isRequired,
    info: propTypes.object.isRequired, // eslint-disable-line
  };

  constructor() {
    super();

    this.getAuthors = this.getAuthors.bind(this);

    this.getAuthors();
  }

  async getAuthors() {
    const dataSet = {
      authors: null,
      printers: null,
    };

    const resultsAuthor = await knex('AUTHOR').select();
    dataSet.authors = _map(resultsAuthor, (value) => _mapKeys(value, (v, k) => _toLower(k)));

    const resultsPrinter = await knex('PRINTER').select();
    dataSet.printers = _map(resultsPrinter, (value) => _mapKeys(value, (v, k) => _toLower(k)));

    this.props.setData(dataSet);
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        {props.data.authors !== null ? (
          <form id="authorForm" noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12} sm={6} lg={4}>
                <FormControl>
                  <InputLabel htmlFor="name-disabled">Printer</InputLabel>
                  <Select
                    value={props.info.get('printerId') || 0}
                    onChange={(e) => props.setInfo('printerId', e.target.value)}
                    displayEmpty
                    name="age"
                    autoWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {_map(props.data.printers, (value) => (<MenuItem value={value.id}>{value.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <FormControl>
                  <InputLabel htmlFor="name-disabled">Author</InputLabel>
                  <Select
                    value={props.info.get('authorId') || 0}
                    onChange={(e) => props.setInfo('authorId', e.target.value)}
                    displayEmpty
                    name="age"
                    autoWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {_map(props.data.authors, (value) => (<MenuItem value={value.id}>{value.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  onChange={(e) => props.setInfo('name', e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  label="Signature"
                  onChange={(e) => props.setInfo('signature', e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  label="Barcode"
                  onChange={(e) => props.setInfo('barcode', e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <TextField
                  label="Number of pages"
                  onChange={(e) => props.setInfo('numberOfPages', e.target.value)}
                  margin="normal"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  label="Place of Issue"
                  onChange={(e) => props.setInfo('placeOfIssue', e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  label="Language"
                  onChange={(e) => props.setInfo('language', e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  label="Year of Issue"
                  onChange={(e) => props.setInfo('yearOfIssue', e.target.value)}
                  margin="normal"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  label="Period of Issue"
                  onChange={(e) => props.setInfo('periodOfIssue', e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  onChange={(e) => props.setInfo('description', e.target.value)}
                  margin="normal"
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>) : (
            <div>loading...</div>
          )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data,
  info,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    setData: (d) => dispatch(setData(d)),
    setInfo: (key, value) => dispatch(setInfo(key, value)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Info);
