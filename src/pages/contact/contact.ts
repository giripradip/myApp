import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from "lodash";

import { ContactService } from '../../providers/my-app-api/contact-service';
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
        private contactService: ContactService) {
        this.newContact = this.navParams.data; // receiving newContact object from nav params
    }

    ionViewDidLoad() {
        this.getContacts();
    }

    ionViewWillEnter() {
        // listening to events and remove contact from the array based on received objects
        this.events.subscribe(Constant.CONTACT, (contact) => {
            if (contact) {
                this.contacts = _.remove(this.contacts, function (e) {
                    return e.id != contact.id;
                });
            }
        });
    }

    // functio to call api and loads contact on the page
    getContacts() {
        let loader = this.loadingController.create({
            content: "Getting contacts..."
        });
        loader.present(); // showing loader
        //api call to get the list of contacts and page info
        this.contactService.getContacts(10, 1).subscribe(contact => {
            this.contact = contact;
            this.contacts = this.contact.data;
            // if new contact is updated updates on new contacts list
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

    //function to go to Contact Details page
    contactSelected(event: any, contact: User) {
        this.navCtrl.parent.parent.push(ContactDetailPage, contact);
        //this.navCtrl.push(ContactDetailPage, contact);
    }

}
