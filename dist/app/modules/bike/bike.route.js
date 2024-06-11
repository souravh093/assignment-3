"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bike_validation_1 = require("./bike.validation");
const bike_controller_1 = require("./bike.controller");
const router = (0, express_1.Router)();
// assign bike routes
router.post('/', (0, validateRequest_1.default)(bike_validation_1.BikeValidations.createBikeValidation), bike_controller_1.BikeController.createBike);
router.get('/', bike_controller_1.BikeController.getAllBikes);
exports.BikeRoutes = router;
