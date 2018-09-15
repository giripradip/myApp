import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { AuthenticationCredentials, AuthenticatedCredentials } from '../../helper/authentication';
import { MyAppApiProvider } from '../../providers/my-app-api/my-app-api';
import { HomePage } from '../home/home';
import { Constant } from '../../helper/constant';

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
        private apiProvider: MyAppApiProvider) {
        this.authenticationCredential = new AuthenticationCredentials();
    }

    ionViewDidLoad() {
        //this.apiProvider.logout();
    }

    // method to call when user clicks login buttom
    login() {
        let loader = this.loadingController.create({
            content: "Logging in..."
        });
        loader.present();
        this.apiProvider.login(this.authenticationCredential).subscribe(authenticatedCredentials => {
            this.apiProvider.setSession(authenticatedCredentials).then((result: any)=> {
                this.events.publish(Constant.USER_EVENT);
                loader.dismiss();
                this.navCtrl.setRoot(HomePage);
            });
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

}
