import { Types } from 'mongoose';

export interface IUser {
  name: string;
  img: string;
  rating: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
  social: boolean;
  isblocked: boolean;
  paidfor:Types.ObjectId[];
  followers: Types.ObjectId[]; 
  following: Types.ObjectId[];  
}
