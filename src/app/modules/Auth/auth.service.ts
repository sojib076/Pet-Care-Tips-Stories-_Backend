import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';

import bcryptJs from 'bcryptjs';
import { User } from '../User/user.model';
import { USER_ROLE } from '../User/user.utils';
import { TLoginUser, typeRegister } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });
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


const registerUser = async (userData:typeRegister) => {
  if (userData.password) {
    userData.password = await bcryptJs.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const user = await User.create({
    ...userData,
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


export const AuthServices = {
  loginUser,
  registerUser,
  googleLogin,
};