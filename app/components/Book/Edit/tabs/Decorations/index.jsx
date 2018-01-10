import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import { fetch } from '../../../../../crud/actions';
import { data, loading } from '../../../../../crud/selectors';

import DecorationPreviewModel from '../../../../../models/decorationPreview';

import styles from './styles';

class DecorationTab extends React.Component {
  static propTypes = {
    bookId: propTypes.number.isRequired,
    redirect: propTypes.func.isRequired,
    classes: propTypes.object.isRequired,
    fetch: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    data: propTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetch(DecorationPreviewModel, { booksId: this.props.bookId });
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        {props.data.has('decorationWithScan') && !props.loading &&
        <GridList cellHeight={280} className={classes.gridList} cols={4} spacing={24}>
          {props.data.get('decorationWithScan').toJS().map(tile => (
            <GridListTile key={tile.id} className={classes.gridListTile} onClick={() => props.redirect(`/decoration/show/${tile.id}`)}>
              <img src={tile.photo} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>by: {tile.nickname}</span>}
              />
            </GridListTile>
          ))}
        </GridList>}
        <Button fab color="primary" aria-label="add" className={classes.button} onClick={() => props.redirect(`/decoration/add/${props.bookId}`)}>
          <AddIcon />
        </Button>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  data,
  loading,
});

const mapDispatchToProps = dispatch => ({
  redirect: (location) => dispatch(push(location)),
  fetch: (model, params) => dispatch(fetch(model, params)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DecorationTab);

