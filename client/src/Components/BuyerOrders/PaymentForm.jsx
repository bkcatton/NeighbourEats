import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {

  const handleSubmit = async e => {
    e.preventDefault();
  };

  return (
    <div>
      <form action="" >
        <CardElement />
        <button onClick={handleSubmit}> Pay </button>
      </form>
    </div>
  );
};

export default PaymentForm;
