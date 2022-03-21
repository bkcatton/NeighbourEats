import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import App from './App';
import UserProvider from './Components/UserProvider';

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

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
