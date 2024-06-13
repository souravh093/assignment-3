import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';
import AppError from '../../errors/AppError';

// create bike controller
const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

// get all bikes controller
const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB();

  if (result.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

// update bike controller
const updateBike = catchAsync(async (req, res) => {
  const result = await BikeServices.updateBikeIntoDB(req.body, req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});

// delete bike controller
const deleteBike = catchAsync(async (req, res) => {
  const result = await BikeServices.deleteBikeFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
