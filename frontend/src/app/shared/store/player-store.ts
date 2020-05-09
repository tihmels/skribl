import { Injectable } from '@angular/core';
import {Store} from '../classes/store';
import {Player} from '../../data/model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerStore extends Store<Player>{

  constructor() {
    super(new Player());
  }

}
