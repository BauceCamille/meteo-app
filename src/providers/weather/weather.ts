import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = '0681a842a988449dc4fbde5fb00e7fc8';

  unit = 'metric'

  forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?';
  weatherURL = 'http://api.openweathermap.org/data/2.5/weather?';
  iconURL = 'http://openweathermap.org/img/w/';

  urlEnding;

  constructor(public httpClient: HttpClient) {
    this.urlEnding = '&APPID='+this.apiKey+'&units='+this.unit;
  }

  getCityWeather(city: string, country: string) {
    return new Promise<any>(resolve => {
      this.httpClient.get(this.weatherURL+'q='+city+','+country+this.urlEnding).subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
        });
    });
    //return this.httpClient.get<any>(this.weatherURL+'q='+city+','+country+this.urlEnding);
  }

  getIconUrl(icon) {
    return this.iconURL+icon+'.png';
  }

  getCityForecast(city: string, country: string) {
    return new Promise<any>(resolve => {
      this.httpClient.get(this.forecastURL+'q='+city+','+country+this.urlEnding).subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
      });
    });
    //return this.httpClient.get<any>(this.forecastURL+'q='+city+','+country+this.urlEnding);
  }

  getCityWeatherByCoordinates(lat: number, lon: number) {
    return new Promise<any>(resolve => {
      this.httpClient.get(this.weatherURL+'lat='+lat+'&lon='+lon+this.urlEnding).subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
        });
    });
    //return this.httpClient.get<any>(this.weatherURL+'lat='+lat+'&lon='+lon+this.urlEnding);
  }
}
