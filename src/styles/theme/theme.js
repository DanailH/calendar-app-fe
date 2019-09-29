import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import './index.css';
import App from '../../App.js';

const theme = createMuiTheme({
  palette: {
    primary: '#F0C808',
    secondary: '#0facf3',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);