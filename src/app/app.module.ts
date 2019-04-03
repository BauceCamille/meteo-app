import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from "@angular/common/http";
import { WeatherProvider } from "../providers/weather/weather";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CityPage } from '../pages/city/city';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CityPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WeatherProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
