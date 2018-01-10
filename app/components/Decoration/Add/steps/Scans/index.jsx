import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

import toBuffer from 'blob-to-buffer';
import _forEach from 'lodash/forEach';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import styles from './styles';

import { showNotification } from '../../../../Notification/actions';
import { completed } from '../../../actions';
import DropZone from '../../../../DropFiles';
import { create, clear } from '../../../../../crud/actions';
import ScanModel from '../../../../../models/scan';

class AddDecorationScans extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    redirect: propTypes.func.isRequired,
    create: propTypes.func.isRequired,
    decoration: propTypes.object.isRequired,
    completed: propTypes.func.isRequired,
    showNotification: propTypes.func.isRequired,
    clear: propTypes.func.isRequired,
  }

  constructor() {
    super();

    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(f) {
    _forEach(f, (ele) => {
      toBuffer(ele, (err, buffer) => {
        if (err) throw err;
        const scan = {
          decorationsId: this.props.decoration.id,
          name: ele.name,
          photo: buffer,
        };
        this.props.create(ScanModel, scan);
      });
    });
    this.props.showNotification('Uploading images');
    this.props.completed();
    this.props.clear();
    this.props.redirect(`/decoration/show/${this.props.decoration.id}`);
  }


  render() {
    const { props: { classes }, props } = this;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <DropZone handleDrop={this.handleDrop} />
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
  redirect: location => dispatch(push(location)),
  create: (model, vals) => dispatch(create(model, vals)),
  completed: () => dispatch(completed()),
  showNotification: message => dispatch(showNotification(message)),
  clear: () => dispatch(clear()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AddDecorationScans);

