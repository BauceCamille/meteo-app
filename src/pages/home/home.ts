import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CityPage } from "../city/city";
import { WeatherProvider } from "../../providers/weather/weather";
import { Geolocation } from '@ionic-native/geolocation';
import { AddCityPage } from '../add-city/add-city';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cityList: Array<{name: string, country: string, icon?: string, temp?: number}>;
  currentLocation: {name: string, country: string, icon?: string, temp?: number};

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider, public geolocation: Geolocation, public modalCtrl: ModalController) {

    //cityList / Favoris
    this.cityList = [];
    this.cityList.push({
      name: 'Nice',
      country: 'FR',
    });
    this.cityList.push({
      name: 'London',
      country: 'UK',
    });
    this.cityList.push({
      name: 'London',
      country: 'CA',
    });
    this.cityList.push({
      name: 'Paris',
      country: 'FR',
    });
    this.cityList.push({
      name: 'Menton',
      country: 'FR',
    });

    //Current location
    this.geolocation.getCurrentPosition().then((resp) => {

      const lat = resp.coords.latitude;
      const lon= resp.coords.longitude;

      this.weatherProvider.getCityWeatherByCoordinates(lat,lon).subscribe(
        weather => {
          this.currentLocation = {
            name: weather.name,
            country: weather.sys.country.toUpperCase(),
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
      context.loadCity(city);
    });
  }

  loadCity(city){
    this.weatherProvider.getCityWeather(city.name, city.country).subscribe(
      weather => {
        city.temp = Math.round( weather.main.temp);
        city.icon = this.weatherProvider.getIconUrl(weather.weather[0].icon);
      }
    );
  }

  addCity() {
    const modal = this.modalCtrl.create(AddCityPage);
    modal.present();
    modal.onDidDismiss( data => {
      if(data.cancel != true){
        this.loadCity(data.city);
        this.cityList.push(data.city);
      }
    });
  }
}
