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
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Pass page and limit to the service
    const result = await postService.getAllPosts(page as number, limit as number);

    // Send the response using the sendResponse utility
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Posts fetched successfully!',
        data: result, // Contains paginated posts, totalPosts, hasMore, etc.
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
    getposts,
    addcomment


}