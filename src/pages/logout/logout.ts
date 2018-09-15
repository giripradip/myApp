import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { MyAppApiProvider } from '../../providers/my-app-api/my-app-api';
import { LoginPage } from '../login/login';
import { Constant } from '../../helper/constant';

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html',
})
export class LogoutPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private apiProvider: MyAppApiProvider,
        public events: Events
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LogoutPage');
    }

    logout() {
        this.apiProvider.logout();
        this.navCtrl.setRoot(LoginPage);
        this.events.publish(Constant.USER_EVENT);
    }

}
