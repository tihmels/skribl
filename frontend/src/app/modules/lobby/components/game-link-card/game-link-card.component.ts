import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-link-card',
  templateUrl: './game-link-card.component.html',
  styleUrls: ['./game-link-card.component.scss']
})
export class GameLinkCardComponent implements OnInit {

  @Input('id') id: number;

  constructor() { }

  ngOnInit(): void {
  }

  getConnection() {
    return 'http://127.0.0.1:4200/' + this.id;
  }

}
