import { Component } from '@angular/core';
import { CoreProvider } from "../../providers/core/core";
import { TimerProvider } from "../../providers/timer/timer";

/**
 * Generated class for the YaraDistanceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'yara-distance',
  templateUrl: 'yara-distance.html'
})
export class YaraDistanceComponent {

  distance: string;

  constructor(private coreProvider: CoreProvider, private timerProvider: TimerProvider) {
    console.log('Hello YaraDistanceComponent Component');
    this.distance = "--";
  }

  ngOnInit(): void {
    this.coreProvider.metricsReceived.subscribe((metrics) => {
      this.distance = metrics.currentDistance.toFixed(2) + " KM";
    });

    this.timerProvider.timerFinished.subscribe(() => {
      this.distance = "--";
    });

  }
}
