import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CityPage } from "../city/city";
import {WeatherProvider} from "../../providers/weather/weather";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cityList: Array<{name: string, country: string, icon?: string, temp?: number}>;
  currentLocation: {name: string, country: string, icon?: string, temp?: number};

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

    //Current location
    console.log(geolocation.getCurrentPosition);
    this.geolocation.getCurrentPosition().then((resp) => {

      const lat = Math.round(resp.coords.latitude);
      const lon= Math.round(resp.coords.longitude);

      this.weatherProvider.getCityWeatherByCoordinates(lat,lon).subscribe(
        weather => {
          this.currentLocation = {
            name: weather.name,
            country: weather.sys.country.toLowerCase(),
            temp: Math.round(weather.main.temp),
            icon: weatherProvider.getIconUrl(weather.weather[0].icon)
          }
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  navToCityDetails(event,city){
      this.navCtrl.push(CityPage,city);
  }

  ionViewDidLoad() {
    this.loadCityList();
  }

  loadCityList(){
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
