import { createMuiTheme } from 'material-ui/styles';
import { red, indigo } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    accent: red,
    type: 'light',
  },
});

export default theme;
