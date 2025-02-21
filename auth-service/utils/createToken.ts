import jwt from 'jsonwebtoken';
import type { CreateTokenData } from '../@types';

const jwtSecret = process.env.JWT_SECRET as string;

export function createToken(data: CreateTokenData): string{
  return jwt.sign(
    data,
    jwtSecret,
    { expiresIn: 60 * 60 }
  );
}