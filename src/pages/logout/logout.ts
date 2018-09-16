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

    // function to handle user logout event
    logout() {
        this.authService.logout(); // logout the user
        this.navCtrl.setRoot(LoginPage);// redirects to login page
        this.events.publish(Constant.USER_EVENT); // creates event for menu update
    }

}
