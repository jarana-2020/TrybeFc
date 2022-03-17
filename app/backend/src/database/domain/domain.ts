export type UserRequest = {
  email: string,
  password: string,
};

export interface UserData extends UserRequest {
  username: string,
  role: string,
  id: number,
}

export type ErrorMessage = {
  message: string
};
