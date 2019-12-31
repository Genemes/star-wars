import { map } from 'rxjs/operators';
import { ListPersonService } from './list-person.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageSearchService } from '../shared/image-search.service';
import { Observable, concat, forkJoin } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ListService } from '../shared/list.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

    person$: Observable<any>
    image$: Observable<any>
    starships$: Observable<any>
    listStarships: any

    mylist: any

    image: string
    query: string
    id: number;

    
    constructor(private service: ListPersonService,
            private serviceImage: ImageSearchService,
            private dialogRef: MatDialogRef<PersonComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) {
                if (this.data) {
                    this.id = this.data.data;
                }
            }

    ngOnInit() {
        this.loadPerson()

        this.person$.subscribe(data => {
            //Recupera a imagem do personagem
            this.getImage(data.name)
            
            //Recupera starships do personagem
            /*this.listStarships =  data.starships.map(item => item)
            this.mylist.map( item =>{
                this.service.getStarship(item) 
            })*/
        })

        
    }
  
    async loadPerson(){
        this.person$ = this.service.loadByID(this.id);
    }

    async getImage(query){
        this.image$ = await this.serviceImage.getImage(query)

        this.image$.subscribe(data => {
            this.image = data.items[0].link
        })
    }

    cancelar() {
        this.dialogRef.close();
    }

}
