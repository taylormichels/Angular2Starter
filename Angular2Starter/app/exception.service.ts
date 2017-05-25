import { Injectable } from '@angular/core';
import { exception } from './exception';
import { Exceptions } from './exception-mocks';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class ExceptionService {    
    private apiUrl = 'api/exceptions';  // URL to web API
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { } // TODO

    getExceptions(): Promise<exception[]> {
        return Promise.resolve(Exceptions);
    }

    getExceptionsAPI(): Observable<exception[]> {
        return this.http.get(this.apiUrl).map(response =>
            <exception[]>response.json().data);
    }   

    update(e: exception): Observable<exception> {
        let url = `${this.apiUrl}/${e.id}`;
        //return this.http.put(url, JSON.stringify(e), { headers: this.headers })
        //            .map(response => <exception>response.json().data);
        return this.http.put(url, JSON.stringify(e), { headers: this.headers })
            .map(res => res.json());
    }     
}