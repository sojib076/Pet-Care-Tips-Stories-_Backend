
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



 export const userServices = {
    userGetProfile,
    userUpdateProfile

}