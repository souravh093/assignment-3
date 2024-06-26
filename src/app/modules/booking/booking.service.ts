import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Bike } from '../bike/bike.model';

// booking create service
const createBookingIntoDB = async (
  payload: TBooking,
  loggedUser: JwtPayload,
) => {
  const bookingData = {
    ...payload,
    userId: loggedUser?.id,
  };

  // find bike and update available status
  await Bike.findByIdAndUpdate(payload.bikeId, {
    isAvailable: false,
  });

  const result = await Booking.create(bookingData);

  return result;
};

// update booking
const updateBookingIntoDB = async (id: string) => {
  // find is booking by id
  const findBookedBike = await Booking.findById(id);

  //   find bike using the bikeId in the findBookedBike variable
  const findBike = await Bike.findById(findBookedBike?.bikeId);

  //   check not find the booked bike then send error
  if (!findBookedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rentals not found');
  }

  //   get current date and booked time date
  const currentTime = new Date().getTime();
  const bookedTime = findBookedBike?.startTime.getTime();

  //   make the hours different
  const differenceHours = (currentTime - bookedTime) / (1000 * 60 * 60);

  //   calculation it and multiply that hours and price per hour
  const totalCost = Number(differenceHours) * Number(findBike?.pricePerHour);

  // find bike and update available status true
  await Bike.findByIdAndUpdate(findBookedBike?.bikeId, {
    isAvailable: true,
  });

  //   update return bike booking rentals
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      returnTime: new Date(),
      totalCost: totalCost.toFixed(0),
      isReturned: true,
    },
    { new: true },
  );

  return result;
};

// get all booking
const getMyAllBookingsIntoDB = async (loggedUser: JwtPayload) => {
  const result = await Booking.find({ userId: loggedUser?.id });

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  updateBookingIntoDB,
  getMyAllBookingsIntoDB,
};
