import { UserData } from "../database/domain/domain";

const userMock: UserData = {
  id:1,
  username: 'julio',
  role: 'admin',
  password: '123456789',
  email: 'admin@admin.com'
}

export const sendDataLogin = {
  user: userMock,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ'
}

export const roleUser = 'admin';

export const clubsMock = [
  {"id": 1,"clubName": "Avaí/Kindermann"},
  {"id": 2,"clubName": "Bahia"},
  {"id": 3,"clubName": "Botafogo"},
]

export default userMock;