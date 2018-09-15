import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabPage } from './tab';
import { ContactPageModule } from '../contact/contact.module';
import { AboutPageModule } from '../about/about.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ContactSelectSearchablePageModule } from '../contact-select-searchable/contact-select-searchable.module';

@NgModule({
  declarations: [
    TabPage,
  ],
  imports: [
    ContactPageModule,
    ContactSelectSearchablePageModule,
    PipesModule,
    AboutPageModule,
    IonicPageModule.forChild(TabPage),
  ]
})
export class TabPageModule { }
