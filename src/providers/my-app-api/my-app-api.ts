import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { AuthenticatedCredentials } from '../../helper/authentication';
import { apiUrl } from '../../helper/url';
import { Constant } from '../../helper/constant';
import { User } from '../../helper/user';
import { Contact } from '../../helper/contact';
import { CreateContact, NewContact } from '../../helper/create-contact';

@Injectable()
export class MyAppApiProvider {

    constructor(
        public http: HttpClient,
        private storage: Storage) { }

    // service to login
    login(authenticationCredential): Observable<AuthenticatedCredentials> {
        return this.http.post<AuthenticatedCredentials>(apiUrl.loginUrl, authenticationCredential);
    }

    getUser(): Observable<User> {
        return this.http.get<any>(apiUrl.userUrl +'2', {}).pipe(map(({ data }) => data));
    }

    getContacts(perPage: number, page: number): Observable<Contact> {
        let url = apiUrl.contactsUrl + "?per_page=" + perPage + "&page="+page;
        return this.http.get<Contact>(url, {});
    }

    deleteContact(contactId: number): Observable<void>{
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

    // function to check if user is logged in or not
     isAuthenticated(): Promise<string>{
        return this.storage.get(Constant.TOKEN);
    }

    // function to save user information to the browser
    setSession(authResult): Promise<any> {
        this.storage.clear();
        return this.storage.set(Constant.TOKEN, authResult.token);
    }

    logout() {
        this.storage.clear();
    }

}
