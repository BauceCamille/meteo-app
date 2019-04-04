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

  forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  iconURL = 'http://openweathermap.org/img/w/';

  urlEnding;

  constructor(public httpClient: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    this.urlEnding = '&APPID='+this.apiKey+'&units='+this.unit;
  }

  getCityWeather(city: string) {
    return this.httpClient.get<any>(this.weatherURL+city+this.urlEnding);
  }

  getIconUrl(icon) {
    return this.iconURL+icon+'.png';
  }

  getCityForecast(city: string) {
    return this.httpClient.get<any>(this.forecastURL+city+this.urlEnding);
  }
}
