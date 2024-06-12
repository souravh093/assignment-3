// generate token
import jwt from 'jsonwebtoken';
import { TGenerateToken } from './user.interface';

export const generateToken = (
  jwtPayload: TGenerateToken,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};
