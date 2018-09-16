import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams) {}

    ionViewDidLoad() {
    }

    // methods to go home page
    goHome(_event: any) {
        this.navCtrl.parent.popToRoot();
    }

}
