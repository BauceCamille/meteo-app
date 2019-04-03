import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";

/**
 * Generated class for the CityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {

  details: any;
  stringWeather: string;

  city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public weatherProvider: WeatherProvider) {
    console.log("plop");
    this.city = navParams.get('city');
  }

  ionViewDidLoad(){
    this.weatherProvider.getCityWeather(this.city).subscribe(
      weather =>{
        console.log(JSON.stringify(weather));
        this.details = weather;
        this.stringWeather = JSON.stringify(weather);
      }
    )
  }

  getIconUrl(){
    return this.weatherProvider.getIconUrl(this.details.weather[0].icon);
  }

}
