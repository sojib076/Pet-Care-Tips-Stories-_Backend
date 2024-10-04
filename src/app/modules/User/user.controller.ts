import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";

const userGetProfile = catchAsync(async (req, res) => {
  
    const result = await userServices.userGetProfile(req);
   
    sendResponse(res,{
        statusCode:200,
        message:"User profile retrieved successfully",
        success:true,
        data:result
    });
});
const userUpdateProfile = catchAsync(async (req, res) => {
      
       
     const result = await userServices.userUpdateProfile(req);
   
    
     sendResponse(res,{
          statusCode:200,
          message:"User profile updated successfully",
          success:true,
          data:result
     });
});

const followUser = catchAsync(async (req, res) => {
    const result = await userServices.followUser(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});

const getFollowedUsers = catchAsync(async (req, res) => {
    const result = await userServices.getFollowedUsers(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});
const getUserPosts = catchAsync(async (req, res) => {
    const result = await userServices.getUserPosts(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});

export const userController = {
    userGetProfile,
    userUpdateProfile,
    followUser,
    getFollowedUsers,
    getUserPosts
  
}

