import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { User } from './user.model';
import { TUser } from './user.interface';

// get profile user
const getUserProfileFromDB = async (email: string) => {
  // check user exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findOne({ email });

  return result;
};

// get profile user
const updateUserIntoDB = async (payload: Partial<TUser>, email: string) => {
  // check user exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findOneAndUpdate(
    { email },
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
