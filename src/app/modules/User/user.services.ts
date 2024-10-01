
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



const followUser = async (req: Request) => {
    
    const currentUserId = req.user._id; 
    const authorId = req.body.authorId; 
  
   
    const currentUser = await User.findById(currentUserId);
    const author = await User.findById(authorId);
  
    if (!currentUser) {
      throw new Error('Current user not found.');
    }
  
    if (!author) {
      throw new Error('Author not found.');
    }
  
 
    const isFollowing = currentUser.following.includes(authorId);
  
    if (isFollowing) {
    
      currentUser.following = currentUser.following.filter(id => id.toString() !== authorId);
      author.followers = author.followers.filter(id => id.toString() !== currentUserId);
    } else {
    
      currentUser.following.push(authorId);
      author.followers.push(currentUserId);
    }
  
  
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