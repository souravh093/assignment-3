import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidations } from './bike.validation';
import { BikeController } from './bike.controller';

const router = Router();

// assign bike routes
router.post(
  '/',
  validateRequest(BikeValidations.createBikeValidation),
  BikeController.createBike,
);

router.get('/', BikeController.getAllBikes);

export const BikeRoutes = router;
