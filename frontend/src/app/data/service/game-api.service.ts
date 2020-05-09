import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, switchMap} from 'rxjs/operators';
import {Game, GameAdapter} from '../model/game';
import {ApiHttpService} from '../../core/services/api-http.service';
import {ApiEndpointsService} from '../../core/services/api-endpoints.service';
import {PlayerAdapter} from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class GameApi {

  constructor(private adapter: GameAdapter,
              private http: ApiHttpService,
              private playerAdapter: PlayerAdapter,
              private endpoints: ApiEndpointsService) {
  }

  create(game: Game): Observable<Game> {
    return this.http.post<Game>(this.endpoints.getGameEndpoint(), this.adapter.toJson(game))
      .pipe(
        switchMap(data => this.adapter.fromJson(data)),
        retry(1),
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Game> {
    return this.http.get<Game>(this.endpoints.getGameByIdEndpoint(id))
      .pipe(
        switchMap(game => this.adapter.fromJson(game)),
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
