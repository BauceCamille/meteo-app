import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import {CityModel} from "../../models/city-model";

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

  getCityWeather(city: CityModel) {
    return new Promise<any>(resolve => {
      this.httpClient.get(this.weatherURL+'q='+city.name+','+city.country+this.urlEnding).subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
        });
    });
  }

  getIconUrl(icon) {
    return this.iconURL+icon+'.png';
  }

  getCityForecast(city: CityModel) {
    return new Promise<any>(resolve => {
      this.httpClient.get(this.forecastURL+'q='+city.name+','+city.country+this.urlEnding).subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
      });
    });
  }

  getCityWeatherByCoordinates(lat: number, lon: number) {
    return new Promise<any>(resolve => {
      this.httpClient.get(this.weatherURL+'lat='+lat+'&lon='+lon+this.urlEnding).subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
        });
    });
  }
}
