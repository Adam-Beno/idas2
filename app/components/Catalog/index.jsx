import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _startCase from 'lodash/startCase';
import _toString from 'lodash/toString';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { CircularProgress } from 'material-ui/Progress';

import { fetch } from '../../crud/actions';
import { loading, data } from '../../crud/selectors';
import Model from '../../models/catalog';

import { setObjectType } from './actions';
import { objectType } from './selectors';

import styles from './styles';

class Motive extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    data: propTypes.object.isRequired, // eslint-disable-line
    loading: propTypes.bool.isRequired,
    fetch: propTypes.func.isRequired,
    setObjectType: propTypes.func.isRequired,
    objectType: propTypes.string.isRequired,
  };

  componentWillMount() {
    this.props.fetch(Model, { objectType: this.props.objectType });
    console.log(this.props.objectType);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objectType !== nextProps.objectType) {
      this.props.fetch(Model, { objectType: nextProps.objectType });
    }
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Catalog
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Object type</InputLabel>
              <Select
                value={this.props.objectType}
                onChange={(event) => this.props.setObjectType(event.target.value)}
                input={<Input name="objectType" id="age-simple" />}
                className={classes.selectField}
              >
                <MenuItem value="TABLE">Table</MenuItem>
                <MenuItem value="VIEW">View</MenuItem>
                <MenuItem value="PROCEDURE">Procedure</MenuItem>
                <MenuItem value="FUNCTION">Function</MenuItem>
                <MenuItem value="TRIGGER">Trigger</MenuItem>
                <MenuItem value="SEQUENCE">Sequence</MenuItem>
              </Select>
            </FormControl>
            {(!props.loading && props.data.has('userObjects')) ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {_map(props.data.get('userObjects').toJS()[0], (val, key) => (
                      <TableCell key={key}>{_startCase(key)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_map(props.data.get('userObjects').toJS(), (val, key) => (
                    <TableRow key={key}>
                      {_map(val, (objVal, objKey) => (
                        <TableCell key={objKey}>{(typeof objVal === 'object') ? _toString(objVal) : objVal}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>) : (
                <CircularProgress />
              )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data,
  loading,
  objectType,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetch: (model, params) => dispatch(fetch(model, params)),
    setObjectType: t => dispatch(setObjectType(t)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Motive);
