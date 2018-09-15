import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';

import { ContactSelectSearchablePage } from './contact-select-searchable';

@NgModule({
  declarations: [
    ContactSelectSearchablePage,
  ],
  imports: [
    SelectSearchableModule,
    IonicPageModule.forChild(ContactSelectSearchablePage),
  ],
})
export class ContactSelectSearchablePageModule {}
