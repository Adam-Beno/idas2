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
import { fetchAuthors, deleteAuthor } from './actions';
import { authors } from './selectors';

class Author extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    authors: propTypes.object.isRequired, // eslint-disable-line
    fetchAuthors: propTypes.func.isRequired,
    deleteAuthor: propTypes.func.isRequired,
  };

  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    this.props.fetchAuthors();
  }

  async handleDelete(id) {
    this.props.deleteAuthor(id);
  }

  handleEdit(id) {
    this.props.redirect(`/authors/edit/${id}`);
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div>
        <Typography type="title" gutterBottom>
          Authors
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <Button fab mini color="primary" aria-label="add" className={classes.addButton} onClick={() => props.redirect('/authors/add-form')}>
              <AddIcon />
            </Button>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Artistic name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.authors.toJS().map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.surname}</TableCell>
                    <TableCell>{n.nickname}</TableCell>
                    <TableCell>{n.age}</TableCell>
                    <TableCell>{n.genre}</TableCell>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authors,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    fetchAuthors: () => dispatch(fetchAuthors()),
    deleteAuthor: id => dispatch(deleteAuthor(id)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Author);
