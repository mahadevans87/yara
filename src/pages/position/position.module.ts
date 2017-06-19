import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionPage } from './position';

@NgModule({
  declarations: [
    PositionPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionPage),
  ],
  exports: [
    PositionPage
  ]
})
export class PositionPageModule {}
