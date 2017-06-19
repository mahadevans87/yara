import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TimerComponent } from "../pages/timer/timer";
import { TimerProvider } from '../providers/timer/timer';
import { YaraDistanceComponent } from '../components/yara-distance/yara-distance';

import { Geolocation } from '@ionic-native/geolocation'
import { LocationProvider } from '../providers/location/location';
import { CoreProvider } from '../providers/core/core';
import { BackgroundGeolocation } from "@ionic-native/background-geolocation";
import { YaraAverageSpeedComponent } from '../components/yara-average-speed/yara-average-speed';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TimerComponent,
    YaraDistanceComponent,
    YaraAverageSpeedComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimerProvider,
    Geolocation,
    LocationProvider,
    BackgroundGeolocation,
    CoreProvider
  ]
})
export class AppModule {}
