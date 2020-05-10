import {Injectable} from '@angular/core';
import {PlayerApi} from '../../data/service/player-api.service';
import {Player} from '../../data/model/player';
import {tap} from 'rxjs/operators';
import {PlayerStore} from '../store/player-store';

@Injectable({
  providedIn: 'root'
})
export class PlayerFacade {

  constructor(private playerApi: PlayerApi, private playerStore: PlayerStore) {
  }

  public createPlayer(username: string, avatar: number) {
    return this.playerApi.create(new Player(null, username, avatar)).pipe(tap(r => this.playerStore.setState(r)));
  }

  public getCurrentPlayer() {
    this.playerStore.state;
  }

  public getPlayerObservable() {
    return this.playerStore.state$;
  }

  public updatePlayer(player: Player) {
    return this.playerApi.update(player).pipe(tap(r => this.playerStore.setState(r)));
  }

  public deletePlayer(id: number) {
    return this.playerApi.delete(id);
  }

}
