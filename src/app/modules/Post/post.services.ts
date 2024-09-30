/* eslint-disable no-console */
import { Request } from "express";
import Post from "./post.model";



const createPost = async (req:Request) => {

    const userId = req.user._id;

    const file = req?.file?.path

   const { title, content, category, premiumContent } = req.body;
   const post = await Post.create({
    author: userId,
         title,
         content,
         category,
         premiumContent,
         image: file,
   });
    return  post;
};


const upvotePost = async (req: Request) => {
    const { postId } = req.body;
    console.log(req.body);
    const userId = req.user._id; 
  
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found  ');
    }
  
   
    const existingVote = post.voters.find(voter => voter.userId.toString() === userId.toString());
  
    if (existingVote) {
      if (existingVote.voteType === 'up') {
       
        return post;
      } else if (existingVote.voteType === 'down') {
     
        post.downvotes -= 1;
        post.upvotes += 1;
        existingVote.voteType = 'up'; 
      }
    } else {
      // New upvote
      post.upvotes += 1;
      post.voters.push({ userId, voteType: 'up' }); 
    }
  
    await post.save();
    return post;
  };
  
  
  const downvotePost = async (req: Request) => {
    const { postId } = req.body; 
    const userId = req.user._id; // Extract userId from the authenticated user
  
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
  
    // Check if the user has already voted
    const existingVote = post.voters.find(voter => voter.userId.toString() === userId.toString());
  
    if (existingVote) {
      if (existingVote.voteType === 'down') {
        // User already downvoted, no action needed
        return post;
      } else if (existingVote.voteType === 'up') {
        // User has upvoted before, now switching to downvote
        post.upvotes -= 1;
        post.downvotes += 1;
        existingVote.voteType = 'down'; // Update vote type to 'down'
      }
    } else {
      // New downvote
      post.downvotes += 1;
      post.voters.push({ userId, voteType: 'down' }); // Add user vote to voters array
    }
  
   const result =   await post.save();
   console.log(result);
    return result;
  };


  
  const getAllPosts = async (page: number, limit: number) => {
    console.log('page', page);
    const skip = (page - 1) * limit;

    // Fetch posts with pagination
    const posts = await Post.find({})
        .populate('author')
        .populate({ path: 'comments.userId' })
        .skip(skip) // Skip posts from previous pages
        .limit(limit) 
        .exec();

    // Get total number of posts (for calculating if there are more pages)
    const totalPosts = await Post.countDocuments();

    // Return the paginated posts, total count, and hasMore flag
    return {
        posts, // Current page of posts
        totalPosts, // Total number of posts in the database
        hasMore: page * limit < totalPosts, // Boolean indicating if there are more pages to load
    };
};
  

  


const addComment = async (req: Request) => {
    const { postId, comment } = req.body;
    console.log('req.body', req.body);
  console.log(req.body);
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    post.comments.push({ userId, content: comment });
    await post.save();
    return post;
 
};



export const postService = {
    createPost,
    upvotePost,
    downvotePost,
    getAllPosts,
    addComment
}