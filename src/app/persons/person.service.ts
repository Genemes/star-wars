import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PeopleRequestModel, PersonModel } from './models/person.model';
import { StarShipModel } from './models/starship.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly API_URL: string = environment.API;
    
  constructor(protected http: HttpClient) {}
  
    listAllPersons(page: number): Observable<PeopleRequestModel> {
        return this.http.get<PeopleRequestModel>(`${this.API_URL}/people/?page=${page}`);
    }
  
    loadByID(id: number): Observable<PersonModel> {
        return this.http.get<PersonModel>(`${this.API_URL}people/${id}`)
          .pipe(take(1));
    }

    getStarship(query: string): Observable<StarShipModel[]> {
        return this.http.get<StarShipModel[]>(query)
    }

}
