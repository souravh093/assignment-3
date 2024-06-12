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

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
};
