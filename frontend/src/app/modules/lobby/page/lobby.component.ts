import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../shared/service/game.service';
import {Observable} from 'rxjs';
import {Game} from '../../../data/model/game';
import {Player} from '../../../data/model/player';
import {GameFacade} from '../../../shared/service/game-facade';
import {PlayerFacade} from '../../../shared/service/player-facade';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, AfterViewInit {

  game$: Observable<Game>;
  player$: Observable<Player>;
  member$: Observable<Player>;

  constructor(private route: ActivatedRoute, private gameFacade: GameFacade, private playerFacade: PlayerFacade, private gameService: GameService) {
  }

  changeRounds(g: Game) {
    this.gameService.updateSettings(g)
  }

  changeTime(g: Game) {
    this.gameService.updateSettings(g)
  }

  ngOnInit() {
    this.game$ = this.gameFacade.getGameObservable();
    this.player$ = this.playerFacade.getPlayerObservable();
  }

  ngAfterViewInit() {
    this.gameService.connect()
    this.gameService.messages$.subscribe(

    )
  }

}
