import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Game} from '../../../data/model/game';
import {Observable, of} from 'rxjs';
import {GameFacade} from '../../../shared/service/game-facade';

@Injectable({
  providedIn: 'root'
})
export class GameResolverService implements Resolve<Observable<Game>> {

  //TODO: Error handling when game doesnt exist
  constructor(private gameFacade: GameFacade) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game> {
    const gameId = route.paramMap.get('id');
    if (gameId) {
      return this.gameFacade.getGame(+route.paramMap.get('id'));
    }
  }
}
