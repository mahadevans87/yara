import { Injectable, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { TimerProvider } from "../timer/timer";
import { LocationProvider } from "../location/location";
import { BackgroundGeolocation, BackgroundGeolocationResponse } from "@ionic-native/background-geolocation";
import { Geoposition } from "@ionic-native/geolocation";
import { Session } from "../../models/Session";
import { Record } from "../../models/Record";
import { Location } from "../../models/Location";
import { Storage } from "@ionic/storage";

/*
  Generated class for the CoreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CoreProvider {
  private previousLocation: Location;


  private currentDistance: number;
  private currentSpeed: number;
  private averageSpeed: number;
  private elapsedTime: number;

  @Output()
  public metricsReceived: EventEmitter<any> = new EventEmitter<any>();

  private runSession: Session;
  private startLocation: Location;

  constructor(private timerProvider: TimerProvider, private locationProvider: LocationProvider,
    private storageProvider: Storage) {
    console.log('Hello CoreProvider Provider');
  }

  ngOnInit() {
    console.log("ngonInit reached");

    this.timerProvider.timerStarted.subscribe(() => {
      this.runSession = new Session('Morning Run', 0, null);
      this.currentDistance = 0;
      this.averageSpeed = 0;
      this.elapsedTime = 0;
      this.startLocation = undefined;
      this.previousLocation = undefined;
      this.locationProvider.startTracking();
    });

    this.timerProvider.timerFinished.subscribe(() => {
      this.saveSession();
    });

    this.locationProvider.backgroundLocationReceived.subscribe((location: Location) => {
      this.computeStats(location);
      this.runSession.pushRecord(new Record(location.timestamp, location.lat, location.lon, this.currentDistance, 0, this.averageSpeed));
    });

    this.locationProvider.foregroundLocationReceived.subscribe((location: Location) => {
      this.computeStats(location);
      this.runSession.pushRecord(new Record(location.timestamp, location.lat, location.lon, this.currentDistance, 0, this.averageSpeed));
    });
  }

  private computeStats(lastLocation: Location): void {

    if (this.previousLocation === undefined) {
      console.log("Previous location not found");
      this.previousLocation = lastLocation;
      this.startLocation = this.previousLocation;
      this.currentDistance = 0.0;
    }

    this.currentDistance += this.calculateDistance(this.previousLocation.lat, this.previousLocation.lon,
      lastLocation.lat, lastLocation.lon);

    this.elapsedTime = ((lastLocation.timestamp - this.startLocation.timestamp) / 3600);
    this.averageSpeed = this.currentDistance / this.elapsedTime;

    this.previousLocation = lastLocation;
    console.log("Current Distance: " + this.currentDistance);
    console.log("Elapsed Time: " + this.elapsedTime)
    console.log("Avg Speed: " + this.averageSpeed);
    this.metricsReceived.emit({
      'currentDistance': this.currentDistance,
      'elapsedTime': this.elapsedTime,
      'averageSpeed': this.averageSpeed
    });
  }

  private calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  private toRad(degree: number) {
    return degree * Math.PI / 180;
  }

  private saveSession(): void {
    var sessions: Array<Session>;
    this.storageProvider.get('runs').
      then((result) => {
        sessions = JSON.parse(result);
        if (!sessions) {
          sessions = new Array<Session>();
        }
        sessions.push(this.runSession);
        console.log(this.runSession);
        console.log(JSON.stringify(this.runSession));
        this.storageProvider.set('runs', JSON.stringify(sessions));
        this.runSession = null;
      }).catch((error) => {
        console.log("Something went wrong - " + error);
        this.runSession = null;
      });
  }
}
