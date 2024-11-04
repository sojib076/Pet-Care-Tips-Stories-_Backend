import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { groupService } from "./Group.services";

const creategroup =catchAsync(async(req,res)=>{
 

    const result = await groupService.createGroup(req);
 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });

})
// getusercreategroup
const getUserCreateGroup =catchAsync(async(req,res)=>{
     
    
     const result = await groupService.getUserCreateGroup(req);
     
     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User is logged in successfully!',
          data: result,
     });

})
const discoverGroup =catchAsync(async(req,res)=>{
     
    
     const result = await groupService.discoverGroup();
     
     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User is logged in successfully!',
          data: result,
     });
})

export const GroupController = {
    creategroup,
    getUserCreateGroup,
    discoverGroup
}