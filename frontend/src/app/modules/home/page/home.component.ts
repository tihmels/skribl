import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerFacade} from '../../../shared/service/player-facade';
import {GameFacade} from '../../../shared/service/game-facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string = '';
  avatar: number = 0;

  game: number;

  constructor(private playerFacade: PlayerFacade,
              private gameFacade: GameFacade,
              private router: Router,
              private route: ActivatedRoute) {
  }

  gotoLobby() {
    this.playerFacade.createPlayer(this.username, this.avatar).pipe(
      switchMap(player => this.gameFacade.createGame(player))
    ).subscribe(
      _ => this.router.navigate(['/lobby'])
    );
  }

  joinGame() {
    this.playerFacade.createPlayer(this.username, this.avatar).subscribe(
      _ => this.router.navigate(['/lobby'])
    );
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        if (data.game) {
          this.game = data.game.id;
        }
      }
    );
  }

}
