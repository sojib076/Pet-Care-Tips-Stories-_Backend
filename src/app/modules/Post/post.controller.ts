import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postService } from "./post.services";

const createpost = catchAsync(async (req, res) => {
    const result = await postService.createPost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Post created successfully!',
        data: result,
    });
});



const upvotepost = catchAsync(async (req, res) => {
  
    const result = await postService.upvotePost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' UPVOTE added successfully!',
        data: result,
    });
});

const downvotepost = catchAsync(async (req, res) => {
    const result = await postService.downvotePost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' DOWNVOTE added successfully!',
        data: result,
    });
});
const getposts = catchAsync(async (req, res) => {
    
    

    
    const result = await postService.getAllPosts();

    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Posts fetched successfully!',
        data: result, 
    });
});


const addcomment = catchAsync(async (req, res) => {
    const result = await postService.addComment(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Comment added successfully!',
        data: result,
    });
});


const updateComment = catchAsync(async (req, res) => {
    const result = await postService.updateComment(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Comment updated successfully!',
        data: result,
    });
});
const deleteComment = catchAsync(async (req, res) => {
    const result = await postService.deleteComment(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Comment deleted successfully!',
        data: result,
    });
});


const getuserfollowignposts = catchAsync(async (req, res) => {
    const result = await postService.getuserfollowignposts(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Following posts fetched successfully!',
        data: result,
    });
});

const search = catchAsync(async (req, res) => {
    const result = await postService.search(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Search results fetched successfully!',
        data: result,
    });
});

const getsinglepost = catchAsync(async (req, res) => {
    const postId = req.params.postId;
    const result = await postService.getsinglepost(postId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});


 const updatepost = catchAsync(async (req, res) => {
    const result = await postService.updatepost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,});
}
);

const  deletepost = catchAsync(async (req, res) => {
    const result = await postService.deletepost(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});

const category =catchAsync(async(req,res)=>{
 
    const query = req.query.category

    
    const result = await postService.category(query as string)
 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });

})
const getUserbyPosts = catchAsync(async (req, res) => {
    const result = await postService.getUserbyPosts(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result,
    });
});

export const postController = {
    getUserbyPosts,
    createpost,
    upvotepost,
    downvotepost,
    getposts,
    addcomment,
    updateComment,
    deleteComment,
    getuserfollowignposts,
    search,
    getsinglepost,
    updatepost,
    deletepost,
    category
    


}