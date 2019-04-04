import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from "../../providers/weather/weather";

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

  dailyWeatherList: Array<{dayName: string, icon: string, tempMax: number, tempMin: number}>;

  roundedTemperature: number;
  city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public weatherProvider: WeatherProvider) {
    this.city = navParams.get('city');
    this.dailyWeatherList = [];
    console.log("city received "+this.city);
  }

  ionViewDidLoad(){
    this.weatherProvider.getCityWeather(this.city).subscribe(
      weather =>{

        console.log(weather);

        this.details = weather;
        this.stringWeather = JSON.stringify(weather);
        this.roundedTemperature = Math.round(this.details.main.temp);
      }
    );
    this.weatherProvider.getCityForecast(this.city).subscribe(
      forecast =>{

        console.log(forecast);

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const context = this;
        let temperatures = [];
        let oldDate = (new Date().getDay()+1)%7;
        let icon;

        forecast.list.forEach(function(value){
          const date = new Date(value.dt_txt);

          if (date.getDay() == new Date().getDay()) {

          }
          else if (date.getDay() == oldDate) {
            temperatures.push(Math.round(value.main.temp));

            //Weather icon is set to the weather at 12h00
            if(date.getHours() == 12){
              icon = context.getIconUrl(value.weather[0].icon)
            }
          }
          else {
            context.dailyWeatherList.push({
              dayName: days[date.getDay()],
              icon: icon,
              tempMin:  Math.min.apply(Math,temperatures),
              tempMax: Math.max.apply(Math,temperatures)
            })

            oldDate = date.getDay();
            temperatures = []; temperatures.push(Math.round(value.main.temp));
          }
        });

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

  /*getIconUrl(){
    return this.weatherProvider.getIconUrl(this.details.weather[0].icon);
  }*/

  getIconUrl(icon){
    return this.weatherProvider.getIconUrl(icon);
  }

}
