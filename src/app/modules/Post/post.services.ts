/* eslint-disable no-console */
import { Request } from "express";
import Post from "./post.model";
import { User } from "../User/user.model";

const createPost = async (req:Request) => {

    const userId = req.user._id;
   

   const { title, content, category, premiumContent } = req.body;
   const post = await Post.create({
    author: userId,
         title,
         content,
         category,
         premiumContent,
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


  
  const getAllPosts = async (req:Request) => {
    const {category} = req.query;
 

    const query = category ? category==='all' ? {} : {category} : {};
    const posts = await Post.find(query)
        .populate('author')
        .populate({ path: 'comments.userId' })
        .exec();
    return {
      posts,
      totalPosts: posts.length,
    };
};
  

const addComment = async (req: Request) => {
    const { postId, comment } = req.body;
  
  console.log(req.body);
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    post.comments.push({
      userId, content: comment,
      
    });
    await post.save();
    return post;
 
};

const deleteComment = async (req: Request) => {
    const { postId, commentId } = req.body
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Post not found');
    }
  
  
    const comment = post.comments.find(comment => comment?._id.toString() === commentId.toString());

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId.toString() !== userId.toString()) {
      throw new Error('Unauthorized');
    }

    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId.toString());
    await post.save();
    return {
      message: 'Comment deleted successfully',
    }
};


const updateComment = async (req: Request) => {
  const userId = req.user._id;
  const { postId, commentId, editCommentValue } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const comment = post.comments.find(comment => comment._id.toString() === commentId.toString());
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.userId.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }
  comment.content = editCommentValue;
  await post.save();
  return post;
};

const getuserfollowignposts = async (req:Request) => {
  const userId = req.user._id;

  console.log(userId,'followign posts');
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const following = user.following;

  const posts = await Post.find({ author: { $in: following } })
    .populate('author')
    .populate({ path: 'comments.userId' })
    .exec();
  return {
    posts,
    totalPosts: posts.length,
  };
}



export const postService = {
    createPost,
    upvotePost,
    downvotePost,
    getAllPosts,
    addComment,
    updateComment,
    deleteComment,
    getuserfollowignposts
   
}