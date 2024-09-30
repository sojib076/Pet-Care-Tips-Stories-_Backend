import { Types } from 'mongoose';

export interface IUser {
  name: string;
  img: string;
  rating: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
  social: boolean;
  followers: Types.ObjectId[];  // Array of ObjectIds referencing other users
  following: Types.ObjectId[];  // Array of ObjectIds referencing other users
}
