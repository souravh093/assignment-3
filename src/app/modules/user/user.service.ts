import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';
import { JwtPayload } from 'jsonwebtoken';

// get profile user
const getUserProfileFromDB = async (loggedUser: JwtPayload) => {
  // check user exist
  const user = await User.isUserExistsByEmail(loggedUser?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findById(user?._id);

  return result;
};

// get profile user
const updateUserIntoDB = async (
  payload: Partial<TUser>,
  loggedUser: JwtPayload,
) => {
  // check user exist
  const user = await User.isUserExistsByEmail(loggedUser?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findOneAndUpdate(
    { email: loggedUser?.email },
    {
      $set: payload,
    },
    { new: true },
  );

  return result;
};

export const UserServices = {
  getUserProfileFromDB,
  updateUserIntoDB,
};
