import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from "lodash";

import { HomePage } from '../home/home';

@Component({
    selector: 'page-custom-name',
    templateUrl: 'custom-name.html',
})
export class CustomNamePage {

    public customName: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder) {
            // initializes form 
            this.customName = this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomNamePage');
    }

    // function to handle create nick name user event
    createNickName() {
        let nickName = this.generateNickName(this.customName.value).toUpperCase();
        this.customName.reset()
        this.navCtrl.setRoot(HomePage, { nickName: nickName }); // redirect to home page with nick name
    }

    // generates nick name
    private generateNickName(name: any): string {
        if (!_.isEmpty(name)) {
            // returns first letter from first name and first letter from last name and concat it with upper case string
            return name.firstName.charAt(0) + name.lastName.charAt(0);
        }
        return;
    }

}
