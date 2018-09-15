import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(this.navParams.data);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage', this.navCtrl.parent);
    }

    goHome(_event: any) {
        this.navCtrl.parent.popToRoot();
    }

}
