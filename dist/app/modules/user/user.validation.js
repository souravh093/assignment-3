"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// create user validation using zod
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(2, { message: 'Password need more than 2 characters' })
            .max(20, 'Password need less than 20 characters'),
        phone: zod_1.z.string({ required_error: 'Phone number is required' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        role: zod_1.z.string({ required_error: 'Role is required' }),
    }),
});
// update user validation using zod
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }).email().optional(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(2, { message: 'Password need more than 2 characters' })
            .max(20, 'Password need less than 20 characters')
            .optional(),
        phone: zod_1.z.string({ required_error: 'Phone number is required' }).optional(),
        address: zod_1.z.string({ required_error: 'Address is required' }).optional(),
        role: zod_1.z.string({ required_error: 'Role is required' }).optional(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
