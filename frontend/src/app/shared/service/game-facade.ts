import {Injectable} from '@angular/core';
import {Player} from '../../data/model/player';
import {tap} from 'rxjs/operators';
import {GameApi} from '../../data/service/game-api.service';
import {Game} from '../../data/model/game';
import {GameStore} from '../store/game-store';

@Injectable({
  providedIn: 'root'
})
export class GameFacade {

  constructor(private gameStore: GameStore, private gameApi: GameApi) {
  }

  public getGameObservable() {
    return this.gameStore.state$;
  }

  public getGame(id: number) {
    return this.gameApi.get(id).pipe(
      tap(result => this.gameStore.setState(result))
    )
  }

  public getCurrentGame() {
    return this.gameStore.state;
  }

  createGame(player: Player) {
    return this.gameApi.create(new Game(null, player, false, true, null)).pipe(tap(result => this.gameStore.setState(result)));
  }


}
