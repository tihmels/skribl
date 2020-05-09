import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LobbyRouting} from './lobby.routing';
import {LobbyComponent} from './page/lobby.component';
import {SettingsCardComponent} from './components/settings-card/settings-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GameLinkCardComponent} from './components/game-link-card/game-link-card.component';
import {PlayerCardComponent} from './components/player-card/player-card.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LobbyComponent, SettingsCardComponent, GameLinkCardComponent, PlayerCardComponent],
  imports: [
    CommonModule,
    LobbyRouting,
    FlexLayoutModule,
    FormsModule
  ]
})
export class LobbyModule {
}
