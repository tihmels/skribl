import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {WebSocketSubject} from 'rxjs/webSocket';
import {Message} from '../../data/model/socket/message';
import {Observable} from 'rxjs';

const wsUrl = environment.wsUrl;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket: WebSocketSubject<Message>;
  private socket$: Observable<Message>;

  constructor() {
  }

  connect(game: number, player: number) {
    this._socket = new WebSocketSubject<Message>(wsUrl + '/' + game + '/player/' + player);
    this._socket.subscribe((message) => this._socket.next(message));
    this.socket$ = this._socket.asObservable();
  }

  getSocketObservable() {
    return this.socket$;
  }
}
