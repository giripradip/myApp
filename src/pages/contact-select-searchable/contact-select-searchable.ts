import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import * as _ from "lodash";

import { ContactService } from '../../providers/my-app-api/contact-service';
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
        private contactService: ContactService) {
    }

    ionViewDidLoad() {
        this.getContacts(); //gets list of contacts
    }

    // function to get list of contacts
    getContacts() {
        let loader = this.loadingController.create({
            content: "Getting contacts..."
        });
        loader.present();
        // api call with param data per page and page number
        this.contactService.getContacts(10, 1).subscribe(contact => {
            this.contact = contact;
            this.contacts = this.contact.data;
            this.contacts = _.map(this.contacts, function (element) {
                // updates arraz to show name of the contact in select options
                return _.extend({}, element, { name: element.first_name + " " + element.last_name });
            });
            loader.dismiss();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

    // function to handle when user is selected from options
    contactSelected(event: {
        component: SelectSearchableComponent,
        value: User
    }) {
        // redirects to the Contact details page with nav arrow 
        this.navCtrl.parent.parent.push(ContactDetailPage, event.value);
    }

}
