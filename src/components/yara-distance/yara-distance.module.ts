import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YaraDistanceComponent } from './yara-distance';

@NgModule({
  declarations: [
    YaraDistanceComponent,
  ],
  imports: [
    IonicPageModule.forChild(YaraDistanceComponent),
  ],
  exports: [
    YaraDistanceComponent
  ]
})

export class YaraDistanceComponentModule {}
