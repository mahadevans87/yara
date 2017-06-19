import { Injectable, NgZone, EventEmitter, Output } from '@angular/core';
import 'rxjs/add/operator/filter';

import { BackgroundGeolocation, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Location } from '../../models/location';
/*
  Generated class for the LocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationProvider {

  private _latitude: Number;
  private _longitude: Number;
  private _altitude: Number;
  private _watch: any;

  @Output()
  public backgroundLocationReceived: EventEmitter<Location> = new EventEmitter<Location>();
  
  @Output()
  public foregroundLocationReceived: EventEmitter<Location> = new EventEmitter<Location>();

  constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation) {
    console.log('Hello LocationProvider Provider');
  }


  startTracking() {

    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this._latitude = location.latitude;
        this._longitude = location.longitude;
        this.backgroundLocationReceived.emit(new Location(location.latitude, location.longitude, location.altitude, location.timestamp));
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this._watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this._latitude = position.coords.latitude;
        this._longitude = position.coords.longitude;
        this.foregroundLocationReceived.emit(new Location(position.coords.latitude, position.coords.longitude,
        position.coords.altitude, position.timestamp / 1000));
     });

    });

  }

  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this._watch.unsubscribe();

  }
}

