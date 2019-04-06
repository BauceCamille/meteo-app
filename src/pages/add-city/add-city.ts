import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the AddCityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-city',
  templateUrl: 'add-city.html',
})
export class AddCityPage {
  countryList: any;
  city: {name: string,country: string};

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public httpClient: HttpClient) {

    this.countryList = [];
    this.loadCountryList();

    //preselect France in country ion select and Paris in input
    this.city = {name: 'Paris', country: 'FR'};
  }

  loadCountryList() {
    this.getCountries().then(countries => {
      this.countryList = countries;
    })
  }

  sendData(isGood: boolean) {
    this.city.name = this.city.name.charAt(0).toUpperCase() + this.city.name.slice(1).toLowerCase();
    this.viewCtrl.dismiss({
      cancel: !isGood,
      city: this.city
    });
  }

  getCountries(){
    return new Promise<any>(resolve => {
      this.httpClient.get('https://restcountries.eu/rest/v2/all').subscribe(data => {
        resolve(data);},
        err => {
        console.log(err);
        });
    });
  }

}
