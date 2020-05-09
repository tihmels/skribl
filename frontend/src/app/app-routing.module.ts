import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';

const routes: Routes = [
   {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'lobby',
        loadChildren: () =>
          import('./modules/lobby/lobby.module').then(m => m.LobbyModule)
      },
      {
        path: '**',
        redirectTo: 'welcome'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
