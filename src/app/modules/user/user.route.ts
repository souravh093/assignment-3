import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

// assign user routes

// get profile for user
router.get('/:email', auth('admin', 'user'), UserController.getUserProfile);

// update profile for user
router.put(
  '/:email',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUserProfile,
);

export const UserRoutes = router;
