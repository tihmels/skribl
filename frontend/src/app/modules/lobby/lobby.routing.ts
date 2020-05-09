import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LobbyComponent} from './page/lobby.component';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRouting {
}
