import { MatchI, UserData } from "../database/domain/domain";

const userMock: UserData = {
  id:1,
  username: 'julio',
  role: 'admin',
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

export const matchsMock  = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  }
]

export const matchsIsInProgressMock  = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  }
]

export const createdMatch = {
  
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  
}

export default userMock;