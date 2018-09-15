import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabPage } from '../tab/tab';
import { MyAppApiProvider } from '../../providers/my-app-api/my-app-api';
import { User } from '../../helper/user';
import { LoginPage } from '../login/login';
import { Constant } from '../../helper/constant';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public user = <User>{};
    public nickName: string;
    public isLoggedIn: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        private apiProvider: MyAppApiProvider) { }

    ionViewDidLoad() {
        this.apiProvider.isAuthenticated().then(
            (val: string | null) => {
                if (val !== null) {
                    this.getUser();
                }
            });
    }

    ionViewCanEnter() {
        this.apiProvider.isAuthenticated().then(
            (val: string | null) => {
                if (val !== null) {
                    this.isLoggedIn = true;
                    return true;
                }
                this.isLoggedIn = false;
                return false;
            });
    }

    ionViewWillEnter() {
        let nickName = this.navParams.get(Constant.NICKNAME);
        if (nickName) {
            this.nickName = nickName;
        }
    }

    goToLoginPage() {
        this.navCtrl.setRoot(LoginPage);
    }

    goToContactsPage() {
        this.navCtrl.setRoot(TabPage);
    }

    getUser() {
        let loader = this.loadingController.create({
            content: "Loading..."
        });
        loader.present();
        this.apiProvider.getUser().subscribe(user => {
            this.user = user;
            loader.dismiss();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }
}

