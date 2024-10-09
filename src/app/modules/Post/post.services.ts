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
 
    const userId = req.user._id; 
  
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found  ');
    }
  
   
    const existingVote = post.voters.find(voter => voter.userId.toString() === userId.toString());
  
    if (existingVote) {
      if (existingVote.voteType === 'up') {
       
        return {
          alreayvoted: true
        }
      } else if (existingVote.voteType === 'down') {
     
        post.downvotes -= 1;
        post.upvotes += 1;
        existingVote.voteType = 'up'; 
      }
    } else {
     
      post.upvotes += 1;
      post.voters.push({ userId, voteType: 'up' }); 
    }
  
    await post.save();
    return post;
  };
  
  
  const downvotePost = async (req: Request) => {
    const { postId } = req.body; 
    const userId = req.user._id; 
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    
    const existingVote = post.voters.find(voter => voter.userId.toString() === userId.toString());
    if (existingVote) {
      if (existingVote.voteType === 'down') {
        
        return {
         alreayvoted: true
        }
      } else if (existingVote.voteType === 'up') {
        post.upvotes -= 1;
        post.downvotes += 1;
        existingVote.voteType = 'down'; 
      }
    } else {
      
      post.downvotes += 1;
      post.voters.push({ userId, voteType: 'down' });
    }
  
   const result =   await post.save();
  
    return result;
  };



  const getAllPosts = async () => {
   
   
    const posts = await Post.find({ ispublished: true }) 
      .populate('author')
      .populate({ path: 'comments.userId' })
      .sort({ createdAt: -1 })
      .exec()
      console.log(posts);

    
    return {
      posts,
    };
  };
  
  

const addComment = async (req: Request) => {

    const { postId, comment } = req.body;
  
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
    
  
  
    const comment = post.comments.find(comment => comment?._id?.toString() === commentId.toString());

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId.toString() !== userId.toString()) {
      throw new Error('Unauthorized');
    }

    post.comments = post.comments.filter(comment => comment._id && comment._id.toString() !== commentId.toString());
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
  const comment = post.comments.find(comment => comment?._id?.toString() === commentId.toString());
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

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const following = user.following;

  const posts = await Post.find({ author: { $in: following } ,ispublished: true})
    .populate('author')
    .populate({ path: 'comments.userId' })
    .exec();

  return {
    posts,
  };
}

const search = async (req: Request) => {
  const { searchTerm, searchCategory } = req.query;

  const query = {
    ispublished: true, 
    ...(searchCategory ? { category: searchCategory } : {}),
    ...(typeof searchTerm === 'string' ? { 
      $or: [
        { content: { $regex: new RegExp(searchTerm, 'i') } }, // Search in content
        { title: { $regex: new RegExp(searchTerm, 'i') } } // Search in title
      ] 
    } : {})
  };

  const posts = await Post.find(query)
    .populate('author')
    .populate({ path: 'comments.userId' })
    .sort({ upvotes: -1 }) 
    .exec();

  return {
    posts,
  };
};

const getsinglepost = async (postId:string) => {
  const post = await Post.findById(postId)
    .populate('author')
    .populate({ path: 'comments.userId' })
    .exec();
  return post;
} 
const updatepost = async (req: Request) => {
  const userId = req.user._id;

  const { postId, title, content, category, premiumContent } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  if (post.author.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }
  const updatedPost = await Post.findByIdAndUpdate(postId, 
    { title, content, category, premiumContent }
    , { new: true });
  return updatedPost;
};

const deletepost = async (req: Request) => {
  const userId = req.user._id;
  const { postId } = req.body;
 
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  if (post.author.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }
  await Post.findByIdAndDelete(postId);

  return {
    message: 'Post deleted successfully',
  }
};
const category = async (query:string)=>{


  const posts = await Post.find({ category: query ,ispublished: true})
    .populate('author')
    .populate({ path: 'comments.userId' })
    .sort({upvotes:-1})
    .exec();
    
    

  return {
    posts,
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
    getuserfollowignposts,
    search,
    getsinglepost,
    updatepost,
    deletepost,
    category

   
}