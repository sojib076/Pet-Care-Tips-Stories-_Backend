import { Request, Response } from "express";
import { paymentServices } from "./payment.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const confirmationController = async (req: Request, res: Response) => {

const query = req.query.transactionId as string;
const postId = req.query.postId as string;
const userId = req.query.userId as string;

const result = await paymentServices.confirmationService( query, userId, postId);

   res.send(result);
};
const initiateController = async (req: Request, res: Response) => {
 

    const result = await paymentServices.initiatePayment(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment initiated',
        data: result,
      });
};

export const paymentControler = {
    confirmationController,
    initiateController,
}