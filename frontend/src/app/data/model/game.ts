import {Injectable} from '@angular/core';
import {Serializer} from '../../core/serializer';
import {Player} from './player';
import {PlayerApi} from '../service/player-api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameAdapter implements Serializer<Game> {

  constructor(private playerService: PlayerApi) {
  }

  fromJson(item: any): Observable<Game> {
    return this.playerService.get(item.admin).pipe(
      map(player =>
        new Game(
          item.id,
          player,
          item.isRunning,
          item.isPrivate,
          new GameSettings(item.settings.selectedRounds, item.settings.selectedTime)))
    );
  }

  toJson(item: Game): any {
    return {
      id: item.id,
      admin: item.admin.id,
      isRunning: item.isRunning,
      isPrivate: item.isPrivate,
      settings: item.settings
    };
  }
}

export interface IGame {
  readonly id: number,
  readonly admin?: Player,
  readonly isRunning?: boolean,
  readonly isPrivate?: boolean,
  readonly settings?: GameSettings
}

export class Game implements IGame{

  constructor(public readonly id = null,
              public readonly admin: Player,
              public readonly isRunning: boolean = false,
              public readonly isPrivate: boolean = true,
              public readonly settings: GameSettings) {
  }

}

export class GameSettings {

  constructor(public selectedRounds: number, public selectedTime: number) {
  }

}
