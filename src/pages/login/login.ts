import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { AuthenticationCredentials, AuthenticatedCredentials } from '../../helper/authentication';
import { HomePage } from '../home/home';
import { Constant } from '../../helper/constant';
import { AuthService } from '../../providers/my-app-api/auth-service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    authenticationCredential: AuthenticationCredentials;
    authenticatedCredentials: AuthenticatedCredentials;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public loadingController: LoadingController,
        private authService: AuthService) {
        this.authenticationCredential = new AuthenticationCredentials();
    }

    ionViewDidLoad() {

    }

    // method to call when user clicks login buttom
    login() {
        let loader = this.loadingController.create({
            content: "Logging in..."
        });
        loader.present();
        this.authService.login(this.authenticationCredential).subscribe(authenticatedCredentials => {
            this.authService.setSession(authenticatedCredentials).then((result: any)=> {
                this.events.publish(Constant.USER_EVENT); // creates event user is logged in to change menu
                loader.dismiss();
                this.navCtrl.setRoot(HomePage); // set root page as home page
            });
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

}
