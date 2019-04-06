import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CityPage } from "../city/city";
import { WeatherProvider } from "../../providers/weather/weather";
import { Geolocation } from '@ionic-native/geolocation';
import { AddCityPage } from '../add-city/add-city';
import { CityModel } from '../../models/city-model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cityList: Array<CityModel>;

  currentLocation: CityModel;

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
  }

  navToCityDetails(event,city){
      this.navCtrl.push(CityPage,{city: city});
  }

  ionViewDidLoad() {
    this.loadCityList();

    //Current location
    this.geolocation.getCurrentPosition().then((resp) => {
      const lat = resp.coords.latitude;
      const lon= resp.coords.longitude;

      this.weatherProvider.getCityWeatherByCoordinates(lat,lon).then(
        weather => {
          this.loadCurrentLocation(weather);
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadCityList(){
    const context = this;
    this.cityList.forEach(function (city) {
      context.loadCity(city);
    });
  }

  loadCity(city){
    this.weatherProvider.getCityWeather(city).then(
      weather => {
        city.temp = Math.round( weather.main.temp);
        city.icon = this.weatherProvider.getIconUrl(weather.weather[0].icon);
      }
    );
  }

  loadCurrentLocation(weather) {
    this.currentLocation = {
      name: weather.name,
      country: weather.sys.country.toUpperCase(),
      temp: Math.round(weather.main.temp),
      icon: this.weatherProvider.getIconUrl(weather.weather[0].icon)
    }
  }

  addCity() {
    const modal = this.modalCtrl.create(AddCityPage);
    modal.present();
    modal.onDidDismiss( data => {
      if(data!=null && data.cancel != true){
        this.loadCity(data.city);
        this.cityList.push(data.city);
      }
    });
  }
}
