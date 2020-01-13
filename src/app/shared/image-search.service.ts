import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap, map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSearchService{
    
    private API_KEY: string = environment.GOOGLE_API_KEY;
    private API_URL: string = environment.GOOGLE_API_URL;
    private CX_ID: string = environment.GOOGLE_ID;
    private URL: string = this.API_URL + this.API_KEY + '&cx=' + this.CX_ID + '&searchType=image' + '&num=1' + '&imgSize=medium' + '&q=';
  
    constructor(private http: HttpClient) { }

    //funcao para acrescentar + entre as palavras
    formatQuery(query: string){
        return query.replace(" ", "+")
    }

    getImage(query) {
        query = this.formatQuery(query)
        return this.http.get(this.URL + query).pipe(take(1))
    }

}
