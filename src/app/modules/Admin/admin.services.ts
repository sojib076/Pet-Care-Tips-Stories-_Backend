import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Post from "../Post/post.model";
import { User } from "../User/user.model";

const getalluser = async () => {
    const result = await User.find().select("-password").lean().exec();
    
    if (!result) {
        throw new Error('Users not found');
    }
    return result;
}


const getallpost = async()=>{

    const result = await Post.find().populate("author")
    if (!result) {
        throw new Error('Posts not found');
    }
 
    return result;

  
}
const getallpayment =()=>{
    return 'getallpayment';
}

const changeRoleadmin = async (id: string) => {
    const find = await User.findById(id);
    if (!find) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const update = await User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    if (!update) {
        throw new AppError(httpStatus.NOT_FOUND, 'Error updating user role');

    }

}
const changeRoleuser = async (id: string) => {
   
    const find = await User.findById(id);
    if (!find) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const update = await User.findByIdAndUpdate(id, { role: 'user' }, { new: true });
    if (!update) {
        throw new AppError(httpStatus.NOT_FOUND, 'Error updating user role');

    }

}

const userblock = async (id: string) => {
    const find = await User.findById(id)
    if (!find) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const isalreadyblocked = find?.isblocked;
    if (isalreadyblocked) {
      const unblock = await User.findByIdAndUpdate(id, { isblocked: false }, { new: true });
      return unblock;
    }
    const block = await User.findByIdAndUpdate(id, { isblocked: true }, { new: true });
    return block;
}


export const adminServices = {
    getalluser,
    getallpost,
    getallpayment,
    changeRoleadmin,
    changeRoleuser,
    userblock

}