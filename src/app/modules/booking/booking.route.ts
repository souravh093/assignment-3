import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingController } from './booking.controller';

const router = Router();

// all booking routes
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking,
);

router.put(
  '/:id/return',
  auth('admin'),
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingController.updateBooking,
);

export const BookingRoutes = router;
