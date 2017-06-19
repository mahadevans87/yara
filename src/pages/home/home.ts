import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimerComponent } from "../timer/timer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

@ViewChild(TimerComponent) timer: TimerComponent;



  constructor(public navCtrl: NavController) {

  }

  timerFinished(secondsElapsed){
    console.log(secondsElapsed);
  }

  timerStarted(){
    console.log("Timer started");
  }
}
