import {Component, OnInit} from '@angular/core';
import {Player} from '../../../data/model/player';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerFacade} from '../../../shared/service/player-facade';
import {Observable} from 'rxjs';
import {GameFacade} from '../../../shared/service/game-facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  player$: Observable<Player>;
  gameId: number;

  constructor(private playerFacade: PlayerFacade,
              private gameFacade: GameFacade,
              private router: Router,
              private route: ActivatedRoute) {
    this.gameId = +this.route.snapshot.paramMap.get('id');
  }

  gotoLobby(player: Player) {
    this.playerFacade.createPlayer(player).pipe(
      switchMap(player => this.gameFacade.createGame(player))
    ).subscribe(
      _ => this.router.navigate(['lobby'])
    );
  }

  joinGame() {

  }

  ngOnInit(): void {
    this.player$ = this.playerFacade.getPlayerObservable();
  }

}
