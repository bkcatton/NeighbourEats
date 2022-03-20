import React from 'react';
// import { withRouter } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();

  // const { publishableKey } = fetch('/config').then(r => r.json());
  // console.log(publishableKey);
  // const stripePromise = loadStripe(publishableKey);
  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log('card', cardElement);
    console.log('stripe', stripe);
    

  };
  
  return (
    <div>
      <form action="">
        <CardElement />
        <button onClick={handleSubmit}> Pay </button>
      </form>
    </div>
  );
};

export default PaymentForm;
