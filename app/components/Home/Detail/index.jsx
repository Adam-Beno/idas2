import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import styles from './styles';

class Detail extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    data: propTypes.object.isRequired,
  };

  render() {
    const { props: { classes, data }, props } = this;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={data.name}
            subheader={`Written by ${data.authorName} published in ${data.yearOfIssue || data.periodOfIssue}`}
          />
          <Menu
            id="simple-menu"
            anchorEl={props.anchorEl}
            open={props.menuOpen}
            onRequestClose={() => props.switchMenuState()}
          >
            <MenuItem onClick={() => props.switchMenuState()}>Edit</MenuItem>
            <MenuItem onClick={() => props.switchMenuState()}>Delete</MenuItem>
          </Menu>
          <CardMedia
            className={classes.media}
            image={data.photo}
            title={data.imageName}
          />
          <CardContent>

          </CardContent>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (location = '/') => dispatch(replace(location)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Detail);

