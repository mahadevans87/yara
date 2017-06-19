import { Component } from '@angular/core';
import { CoreProvider } from "../../providers/core/core";
import { TimerProvider } from "../../providers/timer/timer";

/**
 * Generated class for the YaraAverageSpeedComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'yara-average-speed',
  templateUrl: 'yara-average-speed.html'
})
export class YaraAverageSpeedComponent {

  averageSpeed: string;

  constructor(private coreProvider: CoreProvider, private timerProvider: TimerProvider) {
    console.log('Hello YaraDistanceComponent Component');
    this.averageSpeed = "--";
  }

  ngOnInit(): void {
    this.coreProvider.metricsReceived.subscribe((metrics) => {
      if (!isNaN(metrics.averageSpeed))
        this.averageSpeed = metrics.averageSpeed.toFixed(2) + " Km/Hr";
    });

    this.timerProvider.timerFinished.subscribe(() => {
      this.averageSpeed = "--";
    });

  }
}
