import React from 'react';

const PaymentButton = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await fetch('https://muta-engine-google-api-backend.vercel.app/create-order', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ amount: 2400, currency: 'INR' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { orderId } = await result.json();

    if (!orderId) {
      alert('Unable to create order. Please try again.');
      return;
    }

    const options = {
      key: 'rzp_live_F37H437Co9Ftpn',
      amount: 240000,
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: orderId,
      handler: async (response) => {
        const paymentData = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const verifyRes = await fetch('https://muta-engine-google-api-backend.vercel.app/verify-payment', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const result = await verifyRes.json();

        if (result.success) {
          alert('Payment successful!');
        } else {
          alert('Payment verification failed!');
        }
      },
      prefill: {
        name: 'Your Customer Name',
        email: 'customer.email@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button className='bg-sky-500 rounded-lg px-2 py-1 text-white font-semibold text-sm cursor-pointer' onClick={handlePayment}>
      Buy Now
    </button>
  );
};

export default PaymentButton;
