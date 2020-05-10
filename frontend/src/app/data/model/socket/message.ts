import {Player} from '../player';

export enum Action {
  JOINED,
  LEFT,
  RENAME,
  UPDATE
}

export interface Message {
  action: Action,
  content: any
}
