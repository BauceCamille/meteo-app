import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CityPage } from "../city/city";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {

  }

    goToLondonCity(event,city){
    //console.log("plop");
      this.navCtrl.push(CityPage,{
        city: city
      });
    }

}
