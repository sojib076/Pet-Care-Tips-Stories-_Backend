import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.services";



const getallpost = catchAsync(async (req, res) => {
    const result =  await adminServices.getallpost();
    // eslint-disable-next-line no-console
    console.log(result);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User posts fetched successfully!',
        data: result,
    });
});


const getallusers = catchAsync(async (req, res) => {
    const result = await adminServices.getalluser();  // Add `await` here
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User posts fetched successfully!',
        data: result,
    });
});


const getallpayment = catchAsync(async (req,res) => {
    const result = await  adminServices.getallpayment();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' User posts fetched successfully!',
        data: result,
    });
});

const changeRoleadmin = catchAsync(async (req,res) => {
    const id = req.query.id as string
   
    const result = await adminServices.changeRoleadmin(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: '  Role changed to admin',
        data: result,
    });
});
const changeRoleuser = catchAsync(async (req,res) => {
    const id = req.query.id as string
   
    const result = await adminServices.changeRoleuser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Role changed to user',
        data: result,
    });
});

const userblock = catchAsync(async (req,res) => {
    const id = req.query.id as string
   
    const result = await adminServices.userblock(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' User unblocked successfully',
        data: result,
    });
})

export const adminController = {
    getallpost,
    getallusers,
    getallpayment,
    changeRoleadmin,
    changeRoleuser,
    userblock
}