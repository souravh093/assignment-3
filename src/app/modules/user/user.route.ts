import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

// assign all routes there

// signup user
router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

// login user
router.post(
  '/login',
  validateRequest(UserValidation.loginUserValidationSchema),
  UserController.loginUser,
);

export const UserRoutes = router;
