import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

// sign up user
const createUserIntoDB = async (payload: TUser) => {
  if (await User.isUserExistsByEmail(payload?.email)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This email already exists another user',
    );
  }

  const result = await User.create(payload);

  return result;
};

export const UserServices = {
  createUserIntoDB,
};
