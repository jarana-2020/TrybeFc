import { Request } from 'express';

export type UserRequest = {
  email: string,
};

export interface UserData extends UserRequest {
  username: string,
  role: string,
  id: number,
  password: string,
}

export type ErrorMessage = {
  message: string
};

export interface TokenData {
  email: string,
  iat: number,
}

export interface PersonalRequest extends Request {
  email?: string;
}
