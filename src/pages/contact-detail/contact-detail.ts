import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NavController, NavParams, LoadingController } from 'ionic-angular'; import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../helper/user';
import { ContactService } from '../../providers/my-app-api/contact-service';
import { CreateContactPage } from '../create-contact/create-contact';
import { Constant } from '../../helper/constant';


@Component({
    selector: 'page-contact-detail',
    templateUrl: 'contact-detail.html',
})
export class ContactDetailPage {

    public contact: User;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public loadingController: LoadingController,
        private contactService: ContactService) {
        this.contact = this.navParams.data;
    }

    ionViewDidLoad() {

    }

    ionViewWillEnter() {
        //received params passed from update contact page  and updates the name
        let contact = this.navParams.get(Constant.CONTACT);
        if (contact) {
            let name = contact.name.split(" ");
            this.contact.first_name = name[0];
            this.contact.last_name = name[1];
        }
    }

    // function to delete the contact
    deleteContact(event: any, contact: User) {
        let loader = this.loadingController.create({
            content: "Deleting contact..."
        });
        loader.present();
        this.contactService.deleteContact(contact.id).subscribe(response => {
            loader.dismiss();
            // create events when contact is deleted to update the contact list
            this.events.publish(Constant.CONTACT, contact); 
            this.navCtrl.pop();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

    // redirects to update the contact in contact create page
    updateContact(event: any, contact: User) {
        let uContact = { contact: contact };
        this.navCtrl.push(CreateContactPage, uContact);
    }

}
