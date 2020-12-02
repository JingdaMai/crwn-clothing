import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HtoO6BPKeTATHoznEaSub1INzC6UbpM5yEPcRz4MwPYhvWbKeAZjyg0Nduic1ehdzUr1896VvAohzjQXMz5cBBI00iUHRWz4A';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful')
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

