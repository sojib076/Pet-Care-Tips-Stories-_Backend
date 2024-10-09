import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Post from "../Post/post.model";
import { User } from "../User/user.model";
import { InvoiceModel } from "../payment/invoice.model";

const getalluser = async (pageNumber: string, limit = 10) => {


    const page = parseInt(pageNumber) || 1;

    const skip = (page - 1) * limit;


    const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    if (!users) {
        throw new Error('Users not found');
    }
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    return {
        users,
        totalPages,

        currentPage: page
    };
};



const getallpost = async (page: string,) => {

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10



    const skip = (pageNumber - 1) * pageSize;


    const posts = await Post.find()
        .populate("author")
        .skip(skip)
        .limit(pageSize);

    const totalPosts = await Post.countDocuments();

    if (!posts) {
        throw new Error('Posts not found');
    }

    return {
        posts,
        totalPosts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPosts / pageSize),
    };
};

const getallpayment = async (page: number, limit = 10) => {

    const skip = (page - 1) * limit;
    const paymentlength = await InvoiceModel.countDocuments();

    const payments = await InvoiceModel.find()
        .populate({
            path: 'postId',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .populate({
            path: 'userId',
            model: 'User'
        })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

    if (!payments) {
        throw new Error('Payments not found');
    }


    const totalPayments = await InvoiceModel.countDocuments();


    const totalPages = Math.ceil(totalPayments / limit);

    return {
        payments,
        totalPages,
        paymentlength,
        currentPage: page
    };
};


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

const postpublish = async (id: string) => {
    const find = await Post.findById(id)
    if (!find) {
        throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
    }
    const ispublished = find?.ispublished;
    if (ispublished) {
        const unpublish = await Post.findByIdAndUpdate(id, { ispublished: false }, { new: true });
        return unpublish;
    }
    const publish = await Post.findByIdAndUpdate(id, { ispublished: true }, { new: true });
    return publish;
}

export const adminServices = {
    getalluser,
    getallpost,
    getallpayment,
    changeRoleadmin,
    changeRoleuser,
    userblock,
    postpublish

}