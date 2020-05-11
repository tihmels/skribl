import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Message} from '../../data/model/socket/message';
import {EMPTY, Observable, Subject, timer} from 'rxjs';
import {catchError, delayWhen, retryWhen, switchAll, tap} from 'rxjs/operators';

const WS_URL = environment.wsUrl;
const RECONNECT_INTERVAL = 5000;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => {
    throw e;
  }));

  constructor() {
  }

  connect(game: number, player: number, cfg: { reconnect: boolean } = {reconnect: false}) {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getWebsocket(game, player);
      const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[SocketService] Try to reconnect', val)),
      delayWhen(_ => timer(RECONNECT_INTERVAL)))));
  }

  closeConnection() {
    this.socket$.complete();
    this.socket$ = undefined;
  }

  sendMessage(message: Message) {
    console.log(message);
    this.socket$.next(message);
  }

  private getWebsocket(game: number, player: number): WebSocketSubject<any> {
    return webSocket({
      url: WS_URL + '/' + game,
      serializer: (msg: Message) => JSON.stringify({from: player, ...msg}),
      deserializer: ({data}) => data,
      openObserver: {
        next: () => {
          console.log('[SocketService]: connection established');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[SocketService]: connection closed');
          this.socket$ = undefined;
          this.connect(game, player, {reconnect: true});
        }
      },
    });
  }

}
