import { ListPersonService } from './list-person.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ImageSearchService } from '../shared/image-search.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

    person$: Observable<any>
    image$: Observable<any>
    listStarships: Array<any>
    
    image: string
    query: string
    id: number;
    
    constructor(private service: ListPersonService, private serviceImage: ImageSearchService,
        private dialogRef: MatDialogRef<PersonComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
            this.listStarships = new Array()
            this.listStarships = data.starships.map(function( element, index ) {
                let obj = new Object()
                obj['id'] = index
                obj['query'] = element
                return obj
            })
            this.getInfoStarships(this.listStarships)
        })
    }


    async getInfoStarships(list){
        await list.map( item  => {
            let query = item['query']
            this.service.getStarship(query).subscribe( response => {
                let obj = new Object()
                obj['id'] = item['id']
                obj['query'] = item['query']
                item['nave'] = response
                return obj
            })
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
