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

        this.customName = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomNamePage');
    }

    createNickName() {
        let nickName = this.generateNickName(this.customName.value).toUpperCase();
        this.customName.reset()
        this.navCtrl.setRoot(HomePage, { nickName: nickName });
    }

    private generateNickName(name: any): string {
        if (!_.isEmpty(name)) {
            return name.firstName.charAt(0) + name.lastName.charAt(0);
        }
        return;
    }

}
