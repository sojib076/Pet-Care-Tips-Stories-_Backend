
import { Request } from "express";
import { User } from "./user.model";

const userGetProfile = async (req: Request) => {
   
    const user = req.user;
    if (!user) {
        throw new Error("User not found");
    }

    const result = await User.findOne({email:user.email}).select("-password").lean().exec();

    return result;
}

export const userUpdateProfile = async (req: Request) => {
    const user = req.user;
    if (!user) {
        throw new Error("User not found");
    }
    const result = await User.findOneAndUpdate({email:user.email},req.body,{new:true}).select("-password").lean().exec();
    return result;
} 


import { User } from '../models/User';

const followUser = async (req: Request) => {
    // Retrieve the current user ID from the request user object
    const currentUserId = req.user._id; // Assuming req.user is populated by your authentication middleware
    const authorId = req.body.authorId; // The ID of the author to follow/unfollow
  
    // Find both the current user and the author
    const currentUser = await User.findById(currentUserId);
    const author = await User.findById(authorId);
  
    if (!currentUser) {
      throw new Error('Current user not found.');
    }
  
    if (!author) {
      throw new Error('Author not found.');
    }
  
    // Check if the current user is already following the author
    const isFollowing = currentUser.following.includes(authorId);
  
    if (isFollowing) {
      // If already following, unfollow the author
      currentUser.following = currentUser.following.filter(id => id.toString() !== authorId);
      author.followers = author.followers.filter(id => id.toString() !== currentUserId);
    } else {
      // If not following, follow the author
      currentUser.following.push(authorId);
      author.followers.push(currentUserId);
    }
  
    // Save the updated user documents in the database
    await currentUser.save();
    await author.save();
  
    // Return the updated following list of the current user
    return {
      following: currentUser.following,
    };
  };
  
  export default followUser;



export const getFollowedUsers = async ( req:Request) => {
    const user = req.user;
    if (!user) {
        throw new Error("User not found");
    }
    const result = await User.find({_id:user._id}).select("-password").lean().exec();
    return result;
  
  };



 export const userServices = {
    userGetProfile,
    userUpdateProfile,
    followUser,
    getFollowedUsers

}