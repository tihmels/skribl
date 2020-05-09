import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../../data/model/player';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  @Input('players') players: Player[];
  @Input('admin') admin: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  getAvatarUrl(id: string) {

  }

}
