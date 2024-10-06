import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';

import bcryptJs from 'bcryptjs';
import { User } from '../User/user.model';
import { USER_ROLE } from '../User/user.utils';
import { TLoginUser, } from './auth.interface';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

import { Request } from "express";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user?.isblocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked , Please contact admin');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  } else {
    if (user?.social) {
      throw new AppError(httpStatus.NOT_FOUND, 'User Login with Google');
    }

    if (payload.password) {
      const isPasswordMatched = await bcryptJs.compare(
        payload.password,
        user.password,
      );

      if (!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Password Incorrect!');
      }
    }
    const jwtPayload = {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
      img: user.img,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

};


const registerUser = async (userData: { password: string; }, path:string ) => {
  if (userData.password) {
    userData.password = await bcryptJs.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const user = await User.create({
    ...userData,
    img: path,
    role: USER_ROLE.user,
  });

  return user;
};


const googleLogin = async (userData: { name: string; email: string; role: string; }) => {

    const user =  await User.findOne({ email: userData.email });
    
    if (!user) {
      const user = await registerGoogleUser(userData);
    

    const jwtPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      img: user.img,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  } else{
    const jwtPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      img: user.img,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  
};

const registerGoogleUser = async (userData: { name: string; email: string; role: string; }) => {
  const user = await User.create({
    ...userData,
    social: true,
    role: USER_ROLE.user,
  });

  return user;
};
const forgetPassword = async (email:string) => {

  const userEmail = email;
  

  const user = await User.findOne({ email: userEmail });
    if (user?.social) {
      throw new AppError(httpStatus.NOT_FOUND, 'User Already Login with Google');
      
    }
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    userId: user.id,
    role: user?.role || 'user',
    email: user.email,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;
  sendEmail(user.email, resetUILink);

};


const resetPassword = async (req:Request) => {

  const { password, userId } = req.body;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.password = await bcryptJs.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  await user.save();
  return user;



};
export const AuthServices = {
  forgetPassword,
  loginUser,
  registerUser,
  googleLogin,
  resetPassword
};