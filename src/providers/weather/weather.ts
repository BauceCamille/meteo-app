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
  url;
  urlIcon;

  constructor(public httpClient: HttpClient) {
    console.log('Hello WeatherProvider Provider');

    this.url = 'http://api.openweathermap.org/data/2.5/weather?q=London'+'&APPID='+this.apiKey;
    this.urlIcon = 'http://openweathermap.org/img/w/';
  }

  //Following function takes city and state as an input
  getWeather(city, state) {
    return this.httpClient.get(this.url+'/'+state+'/'+city+'.json')
  }

  getLondonWeather() {
    return this.httpClient.get(this.url);
  }

  getIconUrl(iconId) {
    return this.urlIcon+iconId+'.png';
  }

}
