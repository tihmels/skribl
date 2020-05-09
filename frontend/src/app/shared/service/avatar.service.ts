import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() {
    AvatarService.instance = this;
  }

  static instance: AvatarService;

  private n = 1000;
  private resolution = 100;

  private avatarApi = 'https://api.adorable.io/avatars/' + this.resolution + '/';

  getAvatarUrl(id: number) {
    return this.avatarApi + id;
  }

  last(id: number) {
    const idx = id - 1;
    return idx < 0 ? idx + this.n : idx;
  }

  next(id: number) {
    return (id + 1) % this.n;
  }

  getRandomAvatarId() {
    return Math.floor(Math.random() * this.n);
  }

}
