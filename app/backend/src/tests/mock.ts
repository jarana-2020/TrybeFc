import { MatchI, UserData } from "../database/domain/domain";

const userInfo = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const userData = {
  id: 1,
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin',
  username: 'julio'

}

export const sendDataLogin = {
  user: userInfo,
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

export const matchGoals = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

export const clubsData = [
  {
    id: 1, 
    clubName: 'Avai',
    homeClub: {
      id: 1,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 2,
      awayTeamGoals: 3,
      inProgress: false
    },
  },
  {
    id: 2, 
    clubName: 'Palmeiras',
    homeClub: {
      id: 2,
      homeTeam: 2,
      homeTeamGoals: 4,
      awayTeam: 3,
      awayTeamGoals: 3,
      inProgress: false
    },
  },
  {
    id: 3, 
    clubName: 'Santos',
    homeClub: {
      id: 3,
      homeTeam: 3,
      homeTeamGoals: 1,
      awayTeam: 1,
      awayTeamGoals: 0,
      inProgress: false
    },
  },
    
]

export const classification = [
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 1,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 1,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
  {
    "name": "Avai",
    "totalPoints": 0,
    "totalGames": 1,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
]

export default userInfo;