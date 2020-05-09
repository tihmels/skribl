import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AvatarService} from './service/avatar.service';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: AvatarService, useValue: new AvatarService() }
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule {
}
