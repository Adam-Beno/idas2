import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import _truncate from 'lodash/truncate';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import styles from './styles';
import { switchMenuState } from './actions';
import { menuOpen, anchorEl } from './selectors';

const Book = (props) => {
  const { classes, data } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          title={data.name}
          subheader={`Written by ${data.authorName} published in ${data.yearOfIssue || data.periodOfIssue}`}
        />
        <CardMedia
          className={classes.media}
          image={data.photo}
          title={data.imageName}
        />
        <CardContent>
          <Typography component="p">
            {_truncate(data.description, { length: 160 })}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="primary" onClick={() => props.redirect(`/detail/${data.id}`)}>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

Book.propTypes = {
  classes: propTypes.object.isRequired, // eslint-disable-line
  menuOpen: propTypes.bool.isRequired,
  anchorEl: propTypes.object, // eslint-disable-line
  switchMenuState: propTypes.func.isRequired,
  data: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    authorName: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    photo: propTypes.string.isRequired,
    imageName: propTypes.string.isRequired,
    yearOfIssue: propTypes.number,
    periodOfIssue: propTypes.string,
    placeOfIssue: propTypes.string.isRequired,
    language: propTypes.string.isRequired,
    barcode: propTypes.number.isRequired,
    signature: propTypes.string.isRequired,
    numberOfPages: propTypes.number.isRequired,
  }).isRequired,
  redirect: propTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menuOpen,
  anchorEl,
});

function mapDispatchToProps(dispatch) {
  return {
    switchMenuState: (target) => dispatch(switchMenuState(target)),
    redirect: (location = '/') => dispatch(push(location)),
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Book);

