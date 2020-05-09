import {Player} from '../player';

export enum Action {
  JOINED,
  LEFT,
  RENAME
}

export interface Message {
  from?: Player;
  content?: string;
  action?: Action;
}
