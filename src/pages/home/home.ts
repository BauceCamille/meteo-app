import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CityPage } from "../city/city";
import {WeatherProvider} from "../../providers/weather/weather";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cityList: Array<{name: string, country: string, icon?: string, temp?: number}>;

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider) {

    this.cityList = [];
    this.cityList.push({
      name: 'Nice',
      country: 'fr',
    });
    this.cityList.push({
      name: 'London',
      country: 'us',
    });
    this.cityList.push({
      name: 'Paris',
      country: 'fr',
    });
    this.cityList.push({
      name: 'Menton',
      country: 'fr',
    });

    console.log(this.cityList);

  }

  navToCityDetails(event,city){
      this.navCtrl.push(CityPage,city);
    }

    plop(){
    console.log("plopopolp");
  }

  ionViewDidLoad() {

    const context = this;
    this.cityList.forEach(function (city) {
      context.weatherProvider.getCityWeather(city.name, city.country).subscribe(
        weather => {
          city.temp = Math.round( weather.main.temp);
          city.icon = context.weatherProvider.getIconUrl(weather.weather[0].icon);
        }
      );
    });


  }

}
