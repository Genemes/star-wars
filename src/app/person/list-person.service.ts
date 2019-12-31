import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListService } from '../shared/list.service';


@Injectable({
  providedIn: 'root'
})
export class ListPersonService extends ListService {

    constructor(protected http: HttpClient) {
        super(http, `${environment.API}people`);
    }

}