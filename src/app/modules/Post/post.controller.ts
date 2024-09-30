import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postService } from "./post.services";

const createpost = catchAsync(async (req, res) => {
    const result = await postService.createPost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});



const upvotepost = catchAsync(async (req, res) => {
  
    const result = await postService.upvotePost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});

const downvotepost = catchAsync(async (req, res) => {
    const result = await postService.downvotePost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});
const getposts = catchAsync(async (req, res) => {
    const result = await postService.getAllPosts();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});

const addcomment = catchAsync(async (req, res) => {
    const result = await postService.addComment(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});
export const postController = {
    createpost,
    upvotepost,
    downvotepost,
    getposts,addcomment


}