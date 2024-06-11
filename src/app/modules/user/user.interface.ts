import { Model } from 'mongoose';

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

// make the statics method interface for user validation
export interface UserModel extends Model<TUser> {
  // check user exists using email
  isUserExistsByEmail(email: string): boolean;
}
