import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabPage } from '../tab/tab';
import { AuthService } from '../../providers/my-app-api/auth-service';
import { ContactService } from '../../providers/my-app-api/contact-service';
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
        public authService: AuthService,
        private contactService: ContactService) { }

    ionViewDidLoad() {
        // gets the details of a user if user is logged in
        this.authService.isAuthenticated().then(
            (val: string | null) => {
                if (val !== null) {
                    this.getUser();
                }
            });
    }

    ionViewCanEnter() {
        // authentication guards to check if user is logged in or not and changes the view accordingly
        this.authService.isAuthenticated().then(
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
        //gets nick name and print it on home page
        let nickName = this.navParams.get(Constant.NICKNAME);
        if (nickName) {
            this.nickName = nickName;
        }
    }

    // function to go to login page
    goToLoginPage() {
        this.navCtrl.setRoot(LoginPage);
    }

    //function to go to list of contacts page
    goToContactsPage() {
        this.navCtrl.setRoot(TabPage);
    }

    // function to get details of a user
    getUser() {
        let loader = this.loadingController.create({
            content: "Loading..."
        });
        loader.present();
        this.contactService.getUser().subscribe(user => {
            this.user = user;
            loader.dismiss();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }
}

