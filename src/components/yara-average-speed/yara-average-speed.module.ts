import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YaraAverageSpeedComponent } from './yara-average-speed';

@NgModule({
  declarations: [
    YaraAverageSpeedComponent,
  ],
  imports: [
    IonicPageModule.forChild(YaraAverageSpeedComponent),
  ],
  exports: [
    YaraAverageSpeedComponent
  ]
})
export class YaraAverageSpeedComponentModule {}
