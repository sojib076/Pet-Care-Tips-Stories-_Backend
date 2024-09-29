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


export const userController = {
    userGetProfile,
    userUpdateProfile
}

