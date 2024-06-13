import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import AppError from '../../errors/AppError';

// create booking controller
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

// update booking or return bike controller
const updateBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.updateBookingIntoDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});

// get my all bookings
const getMyAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyAllBookingsIntoDB(req.user);

  if (result.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  updateBooking,
  getMyAllBookings,
};
