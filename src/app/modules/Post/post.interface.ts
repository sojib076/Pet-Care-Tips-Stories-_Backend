import mongoose, { Document } from 'mongoose';

export interface Comment {
  _id: any;
  userId: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId
  content: string;
  createdAt?: Date;
}

export interface PostDocument extends Document {
  title: string;
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

  createdAt?: Date; 
  updatedAt?: Date;
}
