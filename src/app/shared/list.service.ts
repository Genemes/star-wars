import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, concatAll  } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

    constructor(protected http: HttpClient, private API_URL: string) {}
  
    list(page) {
        return this.http.get(`${this.API_URL}/?page=${page}`)
    }
  
    loadByID(id) {
        return this.http.get(`${this.API_URL}/${id}`).pipe(take(1))
    }

    getStarship(query) {
        return this.http.get(query)
    }

    /*
    getItems(urls: string[]): Observable<any> {
        return <Observable<any>> forkJoin(
            urls.map(url=> <Observable<any>> this.http.get(url))
         ).pipe(concatAll());
    }*/

}
