import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { apiUrl } from '../../helper/url';
import { User } from '../../helper/user';
import { Contact } from '../../helper/contact';
import { CreateContact, NewContact } from '../../helper/create-contact';

@Injectable()
export class ContactService {

    constructor(public http: HttpClient) { }

    getUser(): Observable<User> {
        return this.http.get<any>(apiUrl.userUrl + '2', {}).pipe(map(({ data }) => data));
    }

    getContacts(perPage: number, page: number): Observable<Contact> {
        let url = apiUrl.contactsUrl + "?per_page=" + perPage + "&page=" + page;
        return this.http.get<Contact>(url, {});
    }

    deleteContact(contactId: number): Observable<void> {
        let url = apiUrl.userUrl + contactId
        return this.http.delete<any>(url, {});
    }

    // service to create new contact
    createContact(contact: CreateContact): Observable<NewContact> {
        return this.http.post<NewContact>(apiUrl.userUrl, contact);
    }

    // service to create new contact
    updateContact(contact: CreateContact): Observable<NewContact> {
        return this.http.put<NewContact>(apiUrl.userUrl, contact);
    }

}
