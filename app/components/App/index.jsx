import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

// ICONS
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import DashboardIcon from 'material-ui-icons/Dashboard';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import FontDownloadIcon from 'material-ui-icons/FontDownload';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import StyleIcon from 'material-ui-icons/Style';
import BookmarkIcon from 'material-ui-icons/Bookmark';

import { switchMenuState } from './actions';
import { menuState } from './selectors';
import styles from './styles';

import Notification from '../Notification';

class App extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    switchMenuState: propTypes.func.isRequired, // eslint-disable-line
    menuState: propTypes.bool.isRequired, // eslint-disable-line
    children: propTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div className={classes.root}>
        <Notification />
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, props.menuState && classes.appBarShift)}>
            <Toolbar disableGutters={!props.menuState}>
              <IconButton
                color="contrast"
                aria-label="Open drawer"
                onClick={() => props.switchMenuState()}
                className={classNames(classes.menuButton, props.menuState && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Library
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !props.menuState && classes.drawerPaperClose),
            }}
            open={props.menuState}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={() => props.switchMenuState()}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List className={classes.list}>
                <Link to="/" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Link>
                <Link to="/books" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add book" />
                  </ListItem>
                </Link>
                <Link to="/authors" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Authors" />
                  </ListItem>
                </Link>
                <Link to="/printers" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <FontDownloadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Printers" />
                  </ListItem>
                </Link>
                <Link to="/motives" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <StyleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Motives" />
                  </ListItem>
                </Link>
                <Link to="/categories" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                  </ListItem>
                </Link>
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  menuState,
});

function mapDispatchToProps(dispatch) {
  return {
    switchMenuState: () => dispatch(switchMenuState()),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(App);
