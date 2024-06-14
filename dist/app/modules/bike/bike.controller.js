"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bike_service_1 = require("./bike.service");
const noDataFound_1 = __importDefault(require("../../middlewares/noDataFound"));
// create bike controller
const createBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.createBikeIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bike added successfully',
        data: result,
    });
}));
// get all bikes controller
const getAllBikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.getAllBikesFromDB();
    const isNoDataFounds = (0, noDataFound_1.default)(res, result);
    if (!isNoDataFounds) {
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Bikes retrieved successfully',
            data: result,
        });
    }
}));
// update bike controller
const updateBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.updateBikeIntoDB(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bike updated successfully',
        data: result,
    });
}));
// delete bike controller
const deleteBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.deleteBikeFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bike deleted successfully',
        data: result,
    });
}));
exports.BikeController = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike,
};
