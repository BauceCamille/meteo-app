import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CityPage } from "../city/city";
import {WeatherProvider} from "../../providers/weather/weather";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cityList: Array<{name: string, country: string, icon?: string, temp?: number}>;
  currentLocation: {lat: number, lon: number};

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider, public geolocation: Geolocation) {

    //cityList / Favoris
    this.cityList = [];
    this.cityList.push({
      name: 'Nice',
      country: 'fr',
    });
    this.cityList.push({
      name: 'London',
      country: 'uk',
    });
    this.cityList.push({
      name: 'London',
      country: 'ca',
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

    /*//Current location
    console.log(geolocation);
    this.geolocation.getCurrentPosition().then((resp) => {
      //this.currentLocation.lat = resp.coords.latitude;
      //this.currentLocation.lon = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
*/
  }

  navToCityDetails(event,city){
      this.navCtrl.push(CityPage,city);
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
