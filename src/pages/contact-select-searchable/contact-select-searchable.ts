import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectSearchableComponent } from 'ionic-select-searchable';

import { MyAppApiProvider } from '../../providers/my-app-api/my-app-api';
import { Contact } from '../../helper/contact';
import { User } from '../../helper/user';
import { ContactDetailPage } from '../contact-detail/contact-detail';

@IonicPage()
@Component({
    selector: 'page-contact-select-searchable',
    templateUrl: 'contact-select-searchable.html',
})
export class ContactSelectSearchablePage {

    public contact = <Contact>{};
    public contacts: User[] = [];
    public selectedContact: User;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public loadingController: LoadingController,
        private apiProvider: MyAppApiProvider) {
    }

    ionViewDidLoad() {
        this.getContacts();
    }

    getContacts() {
        let loader = this.loadingController.create({
            content: "Getting contacts..."
        });
        loader.present();
        this.apiProvider.getContacts(10, 1).subscribe(contact => {
            this.contact = contact;
            this.contacts = this.contact.data;
            loader.dismiss();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

    contactSelected(event: {
        component: SelectSearchableComponent,
        value: User
    }) {
        this.navCtrl.parent.parent.push(ContactDetailPage, event.value);
    }

}