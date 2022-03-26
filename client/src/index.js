import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import App from './App';
import UserProvider from './Providers/UserProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#123C69', // NAVBAR AND MAIN BUTTONS
    },
    secondary: {
      main: '#eee2dc', // BACKGROUND
    },
    error: {
      main: '#f00', // RED BUTTONS
    },
    success: {
      main: '#266402', // success BUTTONS
    },
    info: {
      main: '#fff', // CARDS
    },
  },
});

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
