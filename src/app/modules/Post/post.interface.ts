import mongoose, { Document } from 'mongoose';

export interface Comment {
  _id?: string;
  userId: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId
  content: string;
  createdAt?: Date;
}

export interface PostDocument extends Document {
  content: string;
  author: mongoose.Types.ObjectId; 
  category: 'Tip' | 'Story';
  image: string; 
  premiumContent: boolean;
  upvotes: number;
  downvotes: number;
  paidby: mongoose.Types.ObjectId[]; 
  comments: Comment[];

  voters: {
    userId: mongoose.Types.ObjectId;
    voteType: 'up' | 'down';
  }[];

  ispublished: boolean;

  createdAt?: Date; 
  updatedAt?: Date;
}
