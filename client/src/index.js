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

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UserProvider>
        <App />
      </UserProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
