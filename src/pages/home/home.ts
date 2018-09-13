import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactDetailPage } from '../contact-detail/contact-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToContactDetail() {
      this.navCtrl.push(ContactDetailPage);
  }

}
