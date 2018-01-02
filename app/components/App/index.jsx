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
import CloseIcon from 'material-ui-icons/Close';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import FullscreenExitIcon from 'material-ui-icons/FullscreenExit';
import RemoveIcon from 'material-ui-icons/Remove';
import FormatQuoteIcon from 'material-ui-icons/FormatQuote';
import LogoutIcon from 'material-ui-icons/ExitToApp';

import { switchMenuState, switchWindowState } from './actions';
import { logout } from '../User/actions';
import { menuState, maximized } from './selectors';
import { authenticated } from '../User/selectors';
import styles from './styles';

import Notification from '../Notification';

import { remote as electron } from '../../utils/electron';

class App extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired, // eslint-disable-line
    switchMenuState: propTypes.func.isRequired, // eslint-disable-line
    menuState: propTypes.bool.isRequired, // eslint-disable-line
    children: propTypes.object.isRequired, // eslint-disable-line
    switchWindowState: propTypes.func.isRequired, // eslint-disable-line
    maximized: propTypes.bool.isRequired, // eslint-disable-line
    authenticated: propTypes.object.isRequired,
    logout: propTypes.func.isRequired,
  }

  constructor() {
    super();

    this.handleMaximizeClick = this.handleMaximizeClick.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentWillMount() {
    /*
    electron.getCurrentWindow().on('resize', () => {
      this.onWindowResize();
    }); */
  }

  onWindowResize() {
    if (electron.getCurrentWindow().isMaximized() && !this.props.maximized) {
      this.props.switchWindowState(true);
    }

    if (!electron.getCurrentWindow().isMaximized() && this.props.maximized) {
      this.props.switchWindowState(false);
    }
  }

  handleMaximizeClick() {
    if (!electron.getCurrentWindow().isMaximized()) {
      electron.getCurrentWindow().maximize();
      this.props.switchWindowState(true);
    } else {
      electron.getCurrentWindow().unmaximize();
      this.props.switchWindowState(false);
    }
  }

  render() {
    const { props: { classes }, props } = this;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Notification />
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
              <Typography type="title" color="inherit" noWrap className={classes.flex}>
                Antique Library
              </Typography>
              <IconButton className={classes.titleButtton} aria-label="Minimize" color="contrast" onClick={() => electron.getCurrentWindow().minimize()}>
                <RemoveIcon />
              </IconButton>
              <IconButton className={classes.titleButtton} aria-label="Switch fullscreen" color="contrast" onClick={this.handleMaximizeClick}>
                {!props.maximized ? (
                  <FullscreenIcon />
                ) : (
                  <FullscreenExitIcon />
                )}
              </IconButton>
              <IconButton className={classes.titleButtton} aria-label="Quit" color="contrast" onClick={() => electron.getCurrentWindow().close()}>
                <CloseIcon />
              </IconButton>
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
                    <ListItemText primary="Books" />
                  </ListItem>
                </Link>
                <Link to="/authors" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <FormatQuoteIcon />
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
              <Divider />
              <List>
                <Link to="/user" className={classes.menuLink}>
                  <ListItem button>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                  </ListItem>
                </Link>
                {props.authenticated.username &&
                <ListItem button onClick={() => props.logout()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>}
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
  maximized,
  authenticated,
});

function mapDispatchToProps(dispatch) {
  return {
    switchMenuState: () => dispatch(switchMenuState()),
    switchWindowState: max => dispatch(switchWindowState(max)),
    logout: () => dispatch(logout()),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(App);
