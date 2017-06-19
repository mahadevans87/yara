import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { ITimer } from "../../pages/timer/itimer";

/*
  Generated class for the TimerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TimerProvider {

    @Input() timeInSeconds: number;

    @Output() 
    timerFinished : EventEmitter<number> = new EventEmitter<number>();  

    @Output() 
    timerPaused : EventEmitter<number> = new EventEmitter<number>();  

    @Output() 
    timerResumed : EventEmitter<number> = new EventEmitter<number>();  

    @Output() 
    tick : EventEmitter<number> = new EventEmitter<number>();  
    
    @Output() 
    timerStarted : EventEmitter<void> = new EventEmitter<void>();  

    public timer: ITimer;

    constructor(
    ) {
        this.initTimer();
    }

    ngOnInit() {
      console.log("hello");
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }

        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.seconds);
    }

    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
        this.timerStarted.emit();
    }

    pauseTimer() {
        this.timer.runTimer = false;
        this.timerPaused.emit(this.timer.seconds);
    }

    resumeTimer() {
        this.startTimer();
        this.timerResumed.emit(this.timer.seconds);
    }

    stopTimer() {
      this.timer.hasFinished = true;
      this.timer.runTimer = false;
      this.timerFinished.emit(this.timer.seconds);
    }

    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.seconds++;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.seconds);
            this.tick.emit(this.timer.seconds);
            this.timerTick();
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }

}
