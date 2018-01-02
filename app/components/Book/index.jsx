import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _map from 'lodash/map';
import _mapKeys from 'lodash/mapKeys';
import _camelCase from 'lodash/camelCase';


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
import { fetch, del } from '../../crud/actions';
import { loading, data } from '../../crud/selectors';
import Model from '../../models/motive';

class Book extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    data: propTypes.object.isRequired, // eslint-disable-line
    fetch: propTypes.func.isRequired,
    del: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
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
    this.props.redirect(`/books/edit/${id}`);
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Books
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <Button fab mini color="primary" aria-label="add" className={classes.addButton} onClick={() => props.redirect('/books/add-form')}>
              <AddIcon />
            </Button>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Signature</TableCell>
                  <TableCell>Barcode</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Issued in</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {(!props.loading && props.data.has('books')) &&
              <TableBody>
                {props.data.get('books').toJS().map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.signature}</TableCell>
                    <TableCell>{n.barcode}</TableCell>
                    <TableCell>{n.language}</TableCell>
                    <TableCell>{n.yearOfIssue || n.periodOfIssue}</TableCell>
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
  data,
  loading,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetch: model => dispatch(fetch(model)),
    del: (model, id) => dispatch(del(model, id)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Book);
