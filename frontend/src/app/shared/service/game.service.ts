import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {Action, Message} from '../../data/model/socket/message';
import {Observable} from 'rxjs';
import {GameStore} from '../store/game-store';
import {PlayerStore} from '../store/player-store';
import {Game, GameAdapter} from '../../data/model/game';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  messages$: Observable<any>;

  constructor(private gameStore: GameStore, private playerState: PlayerStore, private gameAdapter: GameAdapter, private websocket: SocketService) {
  }

  updateSettings(game: Game) {
    const g = this.gameAdapter.toJson(game);
    this.websocket.sendMessage({action: Action.UPDATE, content: g});
  }

  connect() {
    const game = this.gameStore.state;
    const player = this.playerState.state;
    this.websocket.connect(game.id, player.id);
    this.messages$ = this.websocket.messages$.pipe(
      catchError(error => {
        throw error;
      }),
      tap({
          next: (data) => console.log(data),
          error: error => console.log('Error:', error),
          complete: () => console.log('Connection Closed')
        }
      )
    );
    this.subscribe()
  }

  subscribe() {
    this.websocket.messages$.subscribe(result => console.log(result))
  }

  receiveMessage(message: Message) {
    if (message.action == Action.UPDATE) {
      console.log(message);
      //this.gameStore.setState(message.content as Game)
    }
  }

}
