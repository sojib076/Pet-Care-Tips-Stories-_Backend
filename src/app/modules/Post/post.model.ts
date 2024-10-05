import mongoose, { Schema } from 'mongoose';
import { Comment, PostDocument } from './post.interface';

// Define a basic Comment schema
const commentSchema = new Schema<Comment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const voterSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voteType: {
    type: String,
    enum: ['up', 'down'],
    required: true,
  },
});

const postSchema = new Schema<PostDocument>(

  {
    title: {
      type: String,
      required: true,
    },
   
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['Tip', 'Story'],
      required: true,
    },
    premiumContent: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    paidby: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
   ispublished: {
      type: Boolean,
      default: true
   },
    comments: [commentSchema],
    voters: [voterSchema] , // Added voters schema here to track votes
  },
  {
    timestamps: true,
  }
);

// Mongoose Post model
const Post = mongoose.model<PostDocument>('Post', postSchema);

export default Post;
