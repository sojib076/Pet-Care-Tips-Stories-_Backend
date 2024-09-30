import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
 
  const result = await AuthServices.loginUser(req.body);
 
  const { refreshToken, accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});




const registerUser = catchAsync(async (req, res) => {
  
  const path = req.file ? req.file.path : null;
  const result = await AuthServices.registerUser(req.body, path as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });

});
const googleLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.googleLogin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});


const forgetPassword = catchAsync(async (req, res) => {
 const result =  await AuthServices.forgetPassword(req.body.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset password link sent successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  
  const result = await AuthServices.resetPassword(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });

});

export const AuthControllers = {
  loginUser,
  googleLogin,
  registerUser,
  forgetPassword,
  resetPassword
};
