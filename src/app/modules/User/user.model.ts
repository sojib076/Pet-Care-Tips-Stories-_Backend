/* eslint-disable no-useless-escape */
// models/User.ts
import mongoose, { Schema } from 'mongoose';
import { validateEmail } from './user.utils';
import { IUser } from './user.interface';



const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  img: { type: String },
  social: {
    type: Boolean,
    default: false,
  },
  paidfor: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      default: [],
    },
  ],
  isblocked: {
    type: Boolean,
    default: false,
  },
  
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [], 
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [], 
    },
  ],
});



export const User = mongoose.model<IUser>('User', userSchema);
