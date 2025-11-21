import { IGame, IGameSettings, IProfile, IUser } from '../actions';

export interface SectionProps {
  game: IGame;
  settings?: IGameSettings;
  user: IUser | null;
  profile: IProfile;
}

export interface PlayButtonProps {
  game: IGame;
  user: IUser | null;
  role: string;
}
