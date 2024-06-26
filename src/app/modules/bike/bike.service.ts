import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

// insert bike information data into database using mongoose
const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

// get all bikes form database
const getAllBikesFromDB = async () => {
  const result = await Bike.find();

  return result;
};

// update bike from database
const updateBikeIntoDB = async (payload: Partial<TBike>, id: string) => {
  // check the requested update bike are available
  const findBike = await Bike.findById(id);

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

// delete bike from database
const deleteBikeFromDB = async (id: string) => {
  // check the requested delete bike are available
  const findBike = await Bike.findById(id);

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  const result = await Bike.findByIdAndDelete(id, { new: true });

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
