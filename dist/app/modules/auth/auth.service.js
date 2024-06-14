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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
// sign up user
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user have then throw error
    if (yield user_model_1.User.isUserExistsByEmail(payload.email)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This email already exists another user');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
// login user service
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user are exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password nt matched');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
        id: user._id,
    };
    // generate token
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const token = `Bearer ${accessToken}`;
    return {
        token: token,
        data: user,
    };
});
exports.AuthService = {
    signupUser,
    loginUser,
};
