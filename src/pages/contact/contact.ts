import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from "lodash";

import { MyAppApiProvider } from '../../providers/my-app-api/my-app-api';
import { Contact } from '../../helper/contact';
import { User } from '../../helper/user';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { Constant } from '../../helper/constant';
import { NewContact } from '../../helper/create-contact';


@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {

    public contact = <Contact>{};
    public contacts: User[] = [];
    public queryText: string;
    public newContact: NewContact;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public loadingController: LoadingController,
        private apiProvider: MyAppApiProvider) {
        this.newContact = this.navParams.data;
    }

    ionViewDidLoad() {
        this.getContacts();
    }

    ionViewWillEnter() {
        this.events.subscribe(Constant.CONTACT, (contact) => {
            if (contact) {
                this.contacts = _.remove(this.contacts, function (e) {
                    return e.id != contact.id;
                });
            }
        });
    }

    getContacts() {
        let loader = this.loadingController.create({
            content: "Getting contacts..."
        });
        loader.present();
        this.apiProvider.getContacts(10, 1).subscribe(contact => {
            this.contact = contact;
            this.contacts = this.contact.data;
            if (this.newContact && !_.isEmpty(this.newContact)) {
                let newUser = new User();
                newUser.first_name = this.newContact.name;
                newUser.id = this.newContact.id;
                newUser.last_name = " ";
                newUser.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg";
                this.contacts.push(newUser);
            }
            loader.dismiss();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

    contactSelected(event: any, contact: User) {
        this.navCtrl.parent.parent.push(ContactDetailPage, contact);
        //this.navCtrl.push(ContactDetailPage, contact);
    }

}
