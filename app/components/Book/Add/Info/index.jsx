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

import { fetch } from '../../../../crud/actions';
import { loading, data } from '../../../../crud/selectors';
import AuthorModel from '../../../../models/author';
import PrinterModel from '../../../../models/printer';

import InfoForm from './form';

class Info extends Component {
  static propTypes = {
    redirect: propTypes.func.isRequired, // eslint-disable-line
    data: propTypes.object.isRequired, // eslint-disable-line
    fetch: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired, // eslint-disable-line
    handleSubmit: propTypes.func.isRequired,
  };


  componentWillMount() {
    this.props.fetch(AuthorModel);
    this.props.fetch(PrinterModel);
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        {(props.data.has('authors') && props.data.has('printers') && !props.loading) &&
        <InfoForm onSubmit={this.props.handleSubmit} authors={props.data.get('authors').toJS()} printers={props.data.get('printers').toJS()} />}
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
    redirect: (location = '/') => dispatch(push(location)),
    fetch: model => dispatch(fetch(model)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Info);
