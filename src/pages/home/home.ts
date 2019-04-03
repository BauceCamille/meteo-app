import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from "../../providers/weather/weather";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  stringWeather: string;

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider) {

  }

  ionViewWillEnter(){
    this.weatherProvider.getLondonWeather().subscribe(
      weather =>{
        console.log(JSON.stringify(weather));
        this.weather = weather;
        this.stringWeather = JSON.stringify(weather);
      }
    )
  }

  getIconUrl(){
    return this.weatherProvider.getIconUrl(this.weather.weather[0].icon);
  }

}
