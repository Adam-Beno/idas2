import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _find from 'lodash/find';
import _toLower from 'lodash/toLower';


import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';

import styles from './styles';
import knex from '../../utils/knex';
import { fetch, del } from '../../crud/actions';
import { loading, data } from '../../crud/selectors';
import Model from '../../models/printer';

class Printer extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    fetch: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    del: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
  };

  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    this.props.fetch(Model);
  }

  handleDelete(id) {
    this.props.del(Model, id);
  }

  handleEdit(id) {
    this.props.redirect(`/printers/edit/${id}`);
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Printers
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <Button fab mini color="primary" aria-label="add" className={classes.addButton} onClick={() => props.redirect('/printers/add-form')}>
              <AddIcon />
            </Button>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {(!props.loading && props.data.has('printers')) &&
              <TableBody>
                {props.data.get('printers').toJS().map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.surname}</TableCell>
                    <TableCell>
                      <IconButton className={classes.cellButton} aria-label="Edit" onClick={() => this.handleEdit(n.id)}>
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton className={classes.cellButton} aria-label="Delete" onClick={() => this.handleDelete(n.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>}
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading,
  data,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(push(location)),
    fetch: (modelClass) => dispatch(fetch(modelClass)),
    del: (modelClass, id) => dispatch(del(modelClass, id)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Printer);
