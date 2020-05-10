import {Component, Input, OnInit} from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Player} from '../../../../data/model/player';
import {AvatarService} from '../../../../shared/service/avatar.service';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss']
})
export class SelectAvatarComponent implements OnInit {

  @Input('avatar') avatar: number;

  arrowLeft = faAngleLeft;
  arrowRight = faAngleRight;

  constructor(public avatarService: AvatarService) { }

  ngOnInit(): void {
  }

}
