import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameSettings} from '../../../../data/model/game';


@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.scss']
})
export class SettingsCardComponent implements OnInit {

  rounds = [2, 3, 4, 5];
  times = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  @Output()
  changeTime: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  changeRounds: EventEmitter<number> = new EventEmitter<number>();

  @Input('settings') settings: GameSettings;

  constructor() {
  }

  setRounds(r: number) {
    this.changeRounds.emit(r)
  }

  setTime(t: number) {
    this.changeTime.emit(t)
  }

  ngOnInit(): void {
  }

}
