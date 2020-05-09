import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UrlBuilder} from '../../shared/classes/url-builder';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor() {
  }

  private createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(apiUrl, action);
    return urlBuilder.toString();
  }

  private createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    let encodedPathVariablesUrl = '';
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      apiUrl,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }

  public getPlayerByIdEndpoint(id: number): string {
    return this.createUrlWithPathVariables('player', [id]);
  }

  public getGameByIdEndpoint(id: number): string {
    return this.createUrlWithPathVariables('game', [id]);
  }

  public getPlayerEndpoint(): string {
    return this.createUrl('player');
  }

  public getGameEndpoint(): string {
    return this.createUrl('game');
  }

}
