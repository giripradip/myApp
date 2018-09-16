import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Constant } from '../../helper/constant';
import { AuthService } from '../../providers/my-app-api/auth-service';

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html',
})
export class LogoutPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private authService: AuthService,
        public events: Events
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LogoutPage');
    }

    logout() {
        this.authService.logout();
        this.navCtrl.setRoot(LoginPage);
        this.events.publish(Constant.USER_EVENT);
    }

}
