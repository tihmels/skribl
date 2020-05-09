import {Observable} from 'rxjs';

export interface Serializer<T> {
  fromJson(item: any): T | Observable<T>;
  toJson(item: T): any;
}
