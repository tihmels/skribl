import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {Action, Message} from '../../data/model/socket/message';
import {Observable} from 'rxjs';
import {GameStore} from '../store/game-store';
import {PlayerStore} from '../store/player-store';
import {Game, GameAdapter} from '../../data/model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  messages: Observable<Message>;

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
    this.messages = this.websocket.getSocketObservable();
    this.subscribe();
  }

  subscribe() {
    this.messages.subscribe(
      msg => this.receiveMessage(msg),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete'));
    // Called when connection is closed (for whatever reason)  )
  }

  receiveMessage(message: Message) {
    if (message.action == Action.UPDATE) {
      console.log(message);
      //this.gameStore.setState(message.content as Game)
    }
  }

}
