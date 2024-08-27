import axios from 'axios';
import dotenv from 'dotenv';
import config from '../../config';
import { TPaymentInfo } from '../../types/payment.interface';
dotenv.config();

export const initiatePayment = async (paymentData: TPaymentInfo) => {
  const res = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/payments/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:5000/api/payments/confirmation?status=failed`,
    cancel_url: 'http://localhost:5173',
    amount: paymentData.amount,
    currency: 'BDT',
    signature_key: config.signature_key,
    desc: 'Merchant Registration Payment',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: 'N/A',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1206',
    cus_country: 'Bangladesh',
    cus_phone: paymentData.customerPhone,
    type: 'json',
  });

  return res.data;
};

export const verifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: 'json',
      request_id: transactionId,
    },
  });

  return response.data;
};