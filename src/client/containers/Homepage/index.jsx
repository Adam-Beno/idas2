import React from 'react';
import Typography from 'material-ui/Typography';

export default () => (
  <div>
    <Typography type="display2">Welcome on our site!</Typography>
    <br />
    <Typography type="display1" >Styles used:</Typography>
    <ul>
      <li>
        <a href="https://material-ui-1dab0.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Material UI</a>
      </li>
      <li>
        <a href="https://material.io/icons/" target="_blank" rel="noopener noreferrer">Material Icons</a>
      </li>
    </ul>
  </div>
);
