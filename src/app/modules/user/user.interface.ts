import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

// user role type
export type TRole = 'admin' | 'user';

// user type
export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
};

// login user type
export type TLoginUser = {
  email: string;
  password: string;
};

// generate token types
export type TGenerateToken = {
  email: string;
  role: string;
};

// auth interface
export type TUserRole = keyof typeof USER_ROLE;

// make the statics method interface for user validation
export interface UserModel extends Model<TUser> {
  // check user exists using email interface
  isUserExistsByEmail(email: string): Promise<TUser>;

  // password check interface
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
