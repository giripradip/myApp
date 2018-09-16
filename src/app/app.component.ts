import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CustomNamePage } from '../pages/custom-name/custom-name';
import { AuthService } from '../providers/my-app-api/auth-service';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { Constant } from '../helper/constant';
import { CreateContactPage } from '../pages/create-contact/create-contact';
import { TabPage } from '../pages/tab/tab';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any }>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public authService: AuthService,
        public events: Events) {
        this.initializeApp();
        this.setPage();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.events.subscribe(Constant.USER_EVENT, () => this.setPage());
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    // methods to set the menu according to user is logged in or not
    private setPage() {
        this.pages = [{ title: 'Home', component: HomePage }];
        this.authService.isAuthenticated().then(
            (val: string | null) => {
                if (val !== null) { // user is logged in
                    this.pages = this.pages.concat([
                        { title: 'All Contacts', component: TabPage },
                        { title: 'Create Nick Name', component: CustomNamePage },
                        { title: 'Create Contact', component: CreateContactPage },
                        { title: 'Logout', component: LogoutPage }
                    ]);
                    return;
                }// user is not logged in
                this.pages = this.pages.concat([
                    { title: 'Login', component: LoginPage },
                ]);
            });
    }
}
