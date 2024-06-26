import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { generateToken } from './auth.utils';

// sign up user
const signupUser = async (payload: TUser) => {
  // check user have then throw error
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This email already exists another user',
    );
  }

  const result = await User.create(payload);

  return result;
};

// login user service
const loginUser = async (payload: TLoginUser) => {
  // check user are exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not matched');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

  // generate token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const token: string = `${accessToken}`;

  return {
    token: token,
    data: user,
  };
};

export const AuthService = {
  signupUser,
  loginUser,
};
