import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

import InfoIcon from 'material-ui-icons/Info';
import ThumbnailIcon from 'material-ui-icons/Image';
import DecorationIcon from 'material-ui-icons/Filter';

import styles from './styles';
import { changeTab } from './actions';
import { tab } from './selectors';

import BookInfoTab from './tabs/BookInfo';
import ThumbnailTab from './tabs/Thumbnail';
import DecorationTab from './tabs/Decorations';

class BookEdit extends React.Component {
  static propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    classes: propTypes.object.isRequired,
    changeTab: propTypes.func.isRequired,
    tab: propTypes.number.isRequired,
  }

  constructor() {
    super();

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);
    console.log(id);
  }

  handleTabChange(event, value) {
    this.props.changeTab(value);
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        <Typography type="display1">
          Edit book
        </Typography>
        <br />
        <AppBar position="static" color="default">
          <Tabs
            value={props.tab}
            onChange={this.handleTabChange}
            indicatorColor="accent"
            textColor="accent"
            centered
          >
            <Tab label="Info" icon={<InfoIcon />} />
            <Tab label="Thumbnail" icon={<ThumbnailIcon />} />
            <Tab label="Decorations" icon={<DecorationIcon />} />
          </Tabs>
        </AppBar>
        <Paper className={classes.root}>
          {props.tab === 0 && <BookInfoTab bookId={1} />}
          {props.tab === 1 && <ThumbnailTab bookId={1} />}
          {props.tab === 2 && <DecorationTab bookId={1} />}
        </Paper>
      </div>

    );
  }

}

const mapStateToProps = createStructuredSelector({
  tab,
});

const mapDispatchToProps = dispatch => ({
  changeTab: tabIndex => dispatch(changeTab(tabIndex)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(BookEdit);

