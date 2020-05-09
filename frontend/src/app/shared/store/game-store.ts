import {Injectable} from '@angular/core';
import {Store} from '../classes/store';
import {Game} from '../../data/model/game';

@Injectable({
  providedIn: 'root'
})
export class GameStore extends Store<Game> {

  constructor() {
    super(new Game());
  }

}
