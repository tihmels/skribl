import {AvatarService} from '../../shared/service/avatar.service';
import {Injectable} from '@angular/core';
import {Serializer} from '../../core/serializer';

export interface IPlayer {
  readonly id: number,
  readonly username: string,
  readonly avatar: number
}

@Injectable({
  providedIn: 'root'
})
export class PlayerAdapter implements Serializer<IPlayer> {
  fromJson(item: any): Player {
    return new Player(item.id, item.username, item.avatar);
  }
  toJson(item: Player): any {
    return {
      id: item.id,
      username: item.username,
      avatar: item.avatar
    };
  }
}

export class Player implements IPlayer {

  constructor(public readonly id = null, public readonly username = '', public readonly avatar = 0) {
  }

}
