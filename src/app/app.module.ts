import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { CustomNamePage } from '../pages/custom-name/custom-name';
import { ContactDetailPage } from '../pages/contact-detail/contact-detail';
import { TabPageModule } from '../pages/tab/tab.module';
import { MyAppApiProvider } from '../providers/my-app-api/my-app-api';
import { LogoutPage } from '../pages/logout/logout';
import { CreateContactModule } from '../pages/create-contact/create-contact.module';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        CustomNamePage,
        ContactDetailPage,
        LogoutPage
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        TabPageModule,
        CreateContactModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        CustomNamePage,
        ContactDetailPage,
        LogoutPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MyAppApiProvider
    ]
})
export class AppModule { }
