import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewContact } from '../../helper/create-contact';

@IonicPage()
@Component({
    selector: 'page-tab',
    templateUrl: 'tab.html'
})
export class TabPage {

    contactRoot = 'ContactPage'
    contactSelectRoot = 'ContactSelectSearchablePage'
    aboutRoot = 'AboutPage'

    public title: string = "All Contacts";
    public contact: NewContact;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.contact = this.navParams.data;
    }

    goHome(_event: any) {
        this.navCtrl.popToRoot();
    }

}
