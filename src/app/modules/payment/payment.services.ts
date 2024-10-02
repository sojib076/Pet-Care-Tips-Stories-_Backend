/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "../User/user.model";
import { InvoiceModel } from "./invoice.model";
import { initiatePayments } from "./payment.utilis";
import { Request } from 'express';




export const confirmationService = async (transactionId: string, userId: string, postId: string) => {

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("No user found with the provided user ID.");
    }

    const userUpdateResult = await User.findByIdAndUpdate(
        userId, 
        { $push: { paidfor: postId } }, 
        { new: true }
    );

    if (!userUpdateResult) {
        throw new Error("User update failed.");
    }


    const newInvoice = new InvoiceModel({
        userId,
        postId,
        transactionId,
    });
    await newInvoice.save();
    return `
    <html>
    <head>
        <title>Payment Successful</title>
        <style>
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px;
                font-size: 16px;
                color: #fff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
                text-align: center;
            }
            .button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <h1>Payment Successful</h1>
        <p>Thank you for your payment.</p>
        <a href="http://localhost:3000/" class="button">Go to Home</a>
    </body>
    </html>`;
};

export const initiatePayment = async (req:Request) => {
    const userId =  req.query.userId as string;
    const postId = req.query.postId as string;
  const paymentId = "payment" + Math.floor(Math.random() * 10).toString() + userId.slice(0, 3)+postId.slice(0, 3);
    const paymentInfo = {
        transactionId:paymentId,
        userId,
        postId,
    }

    const payment = await initiatePayments(paymentInfo);
  return payment;
}  


export const paymentServices = {
    confirmationService,
    initiatePayment
}