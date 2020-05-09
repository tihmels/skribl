import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './page/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {HomeRoutingModule, routes} from './home.routing';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';

@NgModule({
  declarations: [HomeComponent, SelectAvatarComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HomeRoutingModule,
    FlexLayoutModule
  ]
})
export class HomeModule {
}
