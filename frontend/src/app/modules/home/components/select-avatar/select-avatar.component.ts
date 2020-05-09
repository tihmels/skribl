import {Component, Input, OnInit} from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Player} from '../../../../data/model/player';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {

  @Input('player') player: Player;

  arrowLeft = faAngleLeft;
  arrowRight = faAngleRight;

  constructor() { }

  ngOnInit(): void {
  }

}
