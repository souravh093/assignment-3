"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    };
    if (data.token) {
        responseData.token = data.token;
    }
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
