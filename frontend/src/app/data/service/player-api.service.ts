import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Player, PlayerAdapter} from '../model/player';
import {ApiHttpService} from '../../core/services/api-http.service';
import {ApiEndpointsService} from '../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerApi {

  constructor(private adapter: PlayerAdapter,
              private http: ApiHttpService,
              private endpoints: ApiEndpointsService) {
  }

  get(id: number): Observable<Player> {
    return this.http.get<Player>(this.endpoints.getPlayerByIdEndpoint(id)).pipe(
      map(data => this.adapter.fromJson(data)),
      retry(1),
      catchError(this.handleError)
    );
  }

  create(player: Player): Observable<Player> {
    return this.http.post(this.endpoints.getPlayerEndpoint(), this.adapter.toJson(player)).pipe(
      map(data => this.adapter.fromJson(data)),
      retry(1),
      catchError(this.handleError)
    );
  }

  update(player: Player): Observable<Player> {
    return this.http.put(this.endpoints.getPlayerEndpoint(), this.adapter.toJson(player)).pipe(
      map(data => this.adapter.fromJson(data)),
      retry(1),
      catchError(this.handleError)
    );
  }

  delete(id: number) {
    return this.http.delete(this.endpoints.getPlayerByIdEndpoint(id)).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
