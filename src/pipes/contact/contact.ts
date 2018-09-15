import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

import { User } from '../../helper/user';

@Pipe({
    name: 'contactFilter',
})
export class ContactPipe implements PipeTransform {

    transform(contacts: User[], filterBy: string): User[] {
        if (!contacts) return [];
        if (!filterBy) return contacts;
        filterBy = filterBy.toLowerCase();
        return _.filter(contacts, (contact: User) => {
            return _.includes(contact.first_name.toLowerCase(), filterBy) || _.includes(contact.last_name.toLowerCase(), filterBy);
        });
    }
}
