import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimerProvider } from "../../providers/timer/timer";


@Component({
    selector: 'timer',
    templateUrl: './timer.html'
})
export class TimerComponent {

  displayTime: string;
  isRunning: boolean;
  hasStarted: boolean;
  hasFinished: boolean;

  constructor(private timerProvider: TimerProvider) {
    
  }

  ngOnInit() {
    this.timerProvider.tick.subscribe(elapsedTime => {
      this.displayTime = this.timerProvider.getSecondsAsDigitalClock(elapsedTime);
    });

    this.timerProvider.timerStarted.subscribe(() => { this.updateTimerValues(); });
    this.timerProvider.timerFinished.subscribe(() => this.updateTimerValues());
    this.timerProvider.timerPaused.subscribe(() => this.updateTimerValues());
    this.timerProvider.timerResumed.subscribe(() => this.updateTimerValues());
    this.updateTimerValues();
        
  }

  private updateTimerValues() : void {
    console.log(this);
    this.hasFinished = this.timerProvider.timer.hasFinished;
    this.hasStarted = this.timerProvider.timer.hasStarted;
    this.isRunning = this.timerProvider.timer.runTimer;
    this.displayTime = this.timerProvider.getSecondsAsDigitalClock(this.timerProvider.timer.seconds);
  }

  initTimer() {
    this.timerProvider.initTimer();
    this.updateTimerValues();
  }

  startTimer() {
    this.timerProvider.startTimer();
  }

  stopTimer() {
    this.timerProvider.stopTimer();
  }

  resumeTimer() {
    this.timerProvider.resumeTimer();
  }

  pauseTimer() {
    this.timerProvider.pauseTimer();
  }
    
}