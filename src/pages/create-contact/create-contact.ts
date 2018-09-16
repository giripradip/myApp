import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { CreateContact } from '../../helper/create-contact';
import { ContactService } from '../../providers/my-app-api/contact-service';
import { TabPage } from '../tab/tab';
import { User } from '../../helper/user';
import { Constant } from '../../helper/constant';

@IonicPage()
@Component({
    selector: 'page-create-contact',
    templateUrl: 'create-contact.html',
})
export class CreateContactPage {

    public createContactForm: FormGroup;
    public btnLabel: string;
    private contact: User;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        private contactService: ContactService,
        private formBuilder: FormBuilder) {
        this.contact = this.navParams.get(Constant.CONTACT);
        this.initializeCreateContactForm();
    }

    ionViewDidLoad() {

    }

    createContact() {
        if (!this.contact) {
            this.createNewContact();
            return;
        }
        this.updateContact();
    }

    private createNewContact() {

        let loader = this.loadingController.create({
            content: "Creating contact..."
        });
        loader.present();
        this.contactService.createContact(this.getNewContactObj()).subscribe(newC => {
            loader.dismiss();
            this.createContactForm.reset()
            this.navCtrl.setRoot(TabPage, newC);
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

    private updateContact() {
        let loader = this.loadingController.create({
            content: "Updating contact..."
        });
        loader.present();
        this.contactService.updateContact(this.getNewContactObj()).subscribe(newC => {
            loader.dismiss();
            this.createContactForm.reset()
            this.navCtrl.getPrevious().data.contact = newC;
            this.navCtrl.pop();
        },
            (err: HttpErrorResponse) => {
                console.log(err);
                loader.dismiss();
            });
    }

    private getNewContactObj(): CreateContact {
        let newContact = new CreateContact();
        newContact.name = this.createContactForm.value.firstName + " " + this.createContactForm.value.lastName;
        newContact.job = this.createContactForm.value.job
        return newContact;
    }

    private initializeCreateContactForm() {
        if (!this.contact) {
            this.btnLabel = "Create Contact";
            this.createContactForm = this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                job: ['', Validators.required],
            });
            return;
        }
        this.btnLabel = "Update Contact";
        this.createContactForm = this.formBuilder.group({
            firstName: [this.contact.first_name, Validators.required],
            lastName: [this.contact.last_name, Validators.required],
            job: ['', Validators.required],
        });
    }

}
