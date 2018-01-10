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

import styles from './styles';

const tileData = [
  {
    id: 7,
    img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg',
    title: 'Zima',
    author: 'Jarn Kovl',
  },
  {
    id: 7,
    img: 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png',
    title: 'Léto',
    author: 'Martin Kýžský',
  },
  {
    id: 7,
    img: 'https://cdn.pixabay.com/photo/2017/01/16/19/54/soap-bubble-1985092_960_720.jpg',
    title: 'Podzim',
    author: 'Catherin Lei',
  },
  {
    id: 7,
    img: 'https://cdn.pixabay.com/photo/2018/01/05/23/50/wood-3064114_960_720.jpg',
    title: 'Cesta',
    author: 'Catherin Pei',
  },
  {
    id: 7,
    img: 'https://cdn.pixabay.com/photo/2015/11/25/09/42/rocks-1061540_960_720.jpg',
    title: 'Podzim',
    author: 'Catherin Lei',
  },
];

class DecorationTab extends React.Component {
  static propTypes = {
    bookId: propTypes.number.isRequired,
    redirect: propTypes.func.isRequired,
    classes: propTypes.object.isRequired,
  }

  componentWillMount() {
    console.log(this.props.bookId);
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        <GridList cellHeight={280} className={classes.gridList} cols={4} spacing={24}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} className={classes.gridListTile} onClick={() => props.redirect(`/decoration/${tile.id}`)}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
        <Button fab color="primary" aria-label="add" className={classes.button} onClick={() => props.redirect(`/decoration/add/${props.bookId}`)}>
          <AddIcon />
        </Button>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
  redirect: (location) => dispatch(push(location)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DecorationTab);

