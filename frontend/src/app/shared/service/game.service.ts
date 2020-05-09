import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {Message} from '../../data/model/socket/message';
import {combineLatest, Observable} from 'rxjs';
import {GameState} from '../state/game-state';
import {PlayerState} from '../state/player-state';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  messages: Observable<Message>;

  constructor(private gameState: GameState, private playerState: PlayerState, private websocket: SocketService) {
  }

  connect() {
    combineLatest([this.playerState.getPlayerObservable(), this.gameState.getGameObservable()]).pipe(
      map(([player, game]) => (
        this.websocket.connect(game.id, player.id)
      ))).subscribe(
      _ => this.messages = this.websocket.getSocketObservable()
    );

  }
}
