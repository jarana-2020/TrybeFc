import { Request } from 'express';
import { Model } from 'sequelize/types';

export type UserRequest = {
  email: string,
};

export interface UserData extends UserRequest {
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

export interface MatchI extends CreateMatchI {
  homeClub: { clubName: string },
  awayClub: { clubName: string }
}

export interface LeaderBoardI extends Model{
  id: number;
  clubName: string;
  homeClub: [
    {
      id: number;
      homeTeam: number;
      awayTeam: number;
      homeTeamGoals: number;
      awayTeamGoals: number;
      inProgress: boolean;
    },
  ]

}

export interface CreateMatchI extends Model{
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchMessage = {
  message: string
};

export interface LeaderBoardMatchs {
  id: number;
  clubName: string;
  homeClub?: CreateMatchI[];
  awayClub?: CreateMatchI[];

}

export interface ClassificationI {
  name?: string;
  totalDraws: number;
  totalLosses: number;
  efficiency: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
}

export type TypeClub = 'away' | 'home';
