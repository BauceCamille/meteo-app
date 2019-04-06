import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from "../../providers/weather/weather";
import {CityModel} from "../../models/city-model";

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

  dailyWeatherList: Array<{dayName: string, icon: string, tempMax: number, tempMin: number}>;

  roundedTemperature: number;
  city: CityModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,public weatherProvider: WeatherProvider) {
    this.city = navParams.get('city');
    this.dailyWeatherList = [];
  }

  ionViewDidLoad(){
    this.loadCityWeather();
    this.loadCityForecast();
  }

  loadCityWeather() {
    this.weatherProvider.getCityWeather(this.city).then(
      weather =>{

        console.log("weather got for "+this.city.name);
        console.log(weather);

        this.details = weather;
        this.roundedTemperature = Math.round(this.details.main.temp);
      }
    );
  }

  loadCityForecast() {
    this.weatherProvider.getCityForecast(this.city).then(
      forecast =>{

        console.log("forecast got for "+this.city.name+" :");
        console.log(forecast);

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const context = this;
        let temperatures = [];
        let oldDate = (new Date().getDay()+1)%7;
        let icon;

        //for each dated weather received regroup and compute by day
        forecast.list.forEach(function(value){
          const date = new Date(value.dt_txt);

          if (date.getDay() == new Date().getDay()) {

          }
          else if (date.getDay() == oldDate) {
            temperatures.push(Math.round(value.main.temp));

            //Weather icon is set to the weather at 12h00 (or before for last day)
            if(date.getHours() <= 12){
              icon = context.getIconUrl(value.weather[0].icon)
            }
          }
          else {
            context.dailyWeatherList.push({
              dayName: days[CityPage.getPreviousDay(date.getDay())],
              icon: icon,
              tempMin:  Math.min.apply(Math,temperatures),
              tempMax: Math.max.apply(Math,temperatures)
            });

            oldDate = date.getDay();
            temperatures = []; temperatures.push(Math.round(value.main.temp));
          }
        });

        //push the infos of the last day into the list. (last day can be incomplete)
        this.dailyWeatherList.push(
          {
            dayName:  days[oldDate],
            icon: icon,
            tempMin:  Math.min.apply(Math,temperatures),
            tempMax: Math.max.apply(Math,temperatures)
          }
        )

      }
    );
  }

  static getPreviousDay(day: number){
    let newDay = day-1;
    if (newDay<0) newDay=6;
    return newDay;
  }

  getIconUrl(icon){
    return this.weatherProvider.getIconUrl(icon);
  }

}
