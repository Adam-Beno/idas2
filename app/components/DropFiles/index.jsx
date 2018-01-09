import React from 'react';
import propTypes from 'prop-types';
import DropZone from 'react-dropzone';

import { withStyles } from 'material-ui/styles';
import BackupIcon from 'material-ui-icons/Backup';

import styles from './styles';

class DropFiles extends React.Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    handleDrop: propTypes.func.isRequired,
  }

  render() {
    return (
      <DropZone className={this.props.classes.drop} onDrop={this.props.handleDrop}>
        <p>
          <BackupIcon className={this.props.classes.icon} />
        </p>
      </DropZone>
    );
  }
}

export default withStyles(styles)(DropFiles);
