import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { AuthenticatedCredentials } from '../../helper/authentication';
import { apiUrl } from '../../helper/url';
import { Constant } from '../../helper/constant';



@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient,
        private storage: Storage) { }

    // service to login
    login(authenticationCredential): Observable<AuthenticatedCredentials> {
        return this.http.post<AuthenticatedCredentials>(apiUrl.loginUrl, authenticationCredential);
    }

    // function to check if user is logged in or not
    isAuthenticated(): Promise<string> {
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
