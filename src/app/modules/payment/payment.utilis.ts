/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const initiatePayments = async (paymentInfo:any) => {

    
    try {
        const response = await axios.post('https://sandbox.aamarpay.com/jsonpost.php', {
            store_id: "aamarpaytest",
            signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
            tran_id: paymentInfo.transactionId,
            success_url: `https://petcareblgogs.vercel.app/api/v1/payment/confirmation?transactionId=${paymentInfo.transactionId}&userId=${paymentInfo.userId}&postId=${paymentInfo.postId}&status=success`,
            fail_url: `https://petcareblgogs.vercel.app/api/payment/confirmation?status=failed`,
            cancel_url: "https://petcareblogs.vercel.app/",
            amount: '100',
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: 'sojib',
            cus_email: 'sojibdas@gmail.com',
            cus_add1: 'N/A',
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: '017817436024',
            type: "json"
        });
       
        return response.data;
    }
    catch (err) {
        throw new Error("Payment initiation failed!")
    }
}