import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import AppError from '../../errors/AppError';

// get user profile controller
const getUserProfile = catchAsync(async (req, res) => {
  // get logged user
  const loggedUser = req.user;

  const result = await UserServices.getUserProfileFromDB(req.params.email);

  // check if not matched logged in user email then throw error
  if (loggedUser?.email !== result?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this route',
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

// update user controller
const updateUserProfile = catchAsync(async (req, res) => {
  // get logged user
  const loggedUser = req.user;

  const result = await UserServices.updateUserIntoDB(
    req.body,
    req.params.email,
  );

  // check if not matched logged in user email then throw error
  if (loggedUser?.email !== result?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this route',
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const UserController = {
  getUserProfile,
  updateUserProfile,
};
