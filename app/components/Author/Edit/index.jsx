import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _snakeCase from 'lodash/snakeCase';
import _camelCase from 'lodash/camelCase';
import _mapKeys from 'lodash/mapKeys';
import _toLower from 'lodash/toLower';
import _toUpper from 'lodash/toUpper';
import _merge from 'lodash/merge';
import _omit from 'lodash/omit';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import knex from '../../../utils/knex';
import styles from './styles';
import { editValue, clearStore, setData } from './actions';
import { values, data } from './selectors';

const author = class AuthorEdit extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    redirect: propTypes.func.isRequired, // eslint-disable-line
    values: propTypes.object, // eslint-disable-line
    editValue: propTypes.func.isRequired, // eslint-disable-line
    setData: propTypes.func.isRequired, // eslint-disable-line
    data: propTypes.object.isRequired, // eslint-disable-line
    clearStore: propTypes.func.isRequired, // eslint-disable-line
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData(Number(this.props.match.params.id));
  }

  async getData(id) {
    let result = await knex('AUTHOR').where('ID', id).select().first();
    result = _mapKeys(result, (value, key) => _toLower(_camelCase(key)));
    this.props.setData(result);
  }

  async handleSubmit() {
    const formData = _mapKeys(this.props.values.toJS(), (value, key) => _toUpper(_snakeCase(key)));
    const oldData = _mapKeys(this.props.data, (value, key) => _toUpper(_snakeCase(key)));
    await knex('AUTHOR').where('ID', Number(this.props.match.params.id)).update(_omit(_merge(oldData, formData), ['DATA', 'VALUES', 'ID']));
    this.props.clearStore();
    this.props.redirect('/authors');
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        <Typography type="title" gutterBottom>
          Add new author
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.root}>
            <form id="authorForm" className={classes.container} noValidate autoComplete="off">
              {props.data.name ? (
                <Grid container>
                  <Grid item lg={4} sm={6} xs={12}>
                    <TextField
                      name="firstName"
                      label="First name"
                      className={classes.textField}
                      defaultValue={props.data.name}
                      onChange={(e) => props.editValue('name', e.target.value)}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} sm={6} xs={12}>
                    <TextField
                      name="artisticName"
                      label="Artistic name"
                      className={classes.textField}
                      defaultValue={props.data.nickname}
                      onChange={(e) => props.editValue('nickname', e.target.value)}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} sm={6} xs={12}>
                    <TextField
                      name="lastName"
                      label="Last name"
                      className={classes.textField}
                      defaultValue={props.data.surname}
                      onChange={(e) => props.editValue('surname', e.target.value)}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={4} sm={6} xs={12}>
                    <TextField
                      name="age"
                      label="Age"
                      className={classes.textField}
                      defaultValue={String(props.data.age)}
                      onChange={(e) => props.editValue('age', e.target.value, 'number')}
                      margin="normal"
                      fullWidth
                      type="number"
                    />
                  </Grid>
                  <Grid item lg={4} sm={6} xs={12}>
                    <TextField
                      name="genre"
                      label="Genre"
                      className={classes.textField}
                      defaultValue={props.data.genre}
                      onChange={(e) => props.editValue('genre', e.target.value)}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ) : (
                <CircularProgress className={classes.progress} />)
              }
              <Button raised color="primary" className={classes.button} onClick={this.handleSubmit}>
                SAVE CHANGES
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  values,
  data,
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
    editValue: (key, value, kind = 'string') => dispatch(editValue(key, value, kind)),
    clearStore: () => dispatch(clearStore()),
    setData: (d) => dispatch(setData(d)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(author);
