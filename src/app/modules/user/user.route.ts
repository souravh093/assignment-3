import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

// assign all routes there
router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

export const UserRoutes = router;
