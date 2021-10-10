import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ImageSearchService } from 'src/app/shared/image-search.service';
import { PersonModel } from '../models/person.model';
import { StarShipModel, StarShipRequestModel } from '../models/starship.model';
import { PersonService } from '../person.service';
import { PersonsComponent } from '../persons.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  person$!: Observable<PersonModel>;
  image$!: Observable<any>;
  listStarships!: StarShipRequestModel;
  
  image: string = '';
  query: string = '';
  id: number = 0;
  
  constructor(private service: PersonService, private serviceImage: ImageSearchService,
      private dialogRef: MatDialogRef<PersonsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
          let starshipTemp = {} as StarShipModel;
          let starShipListTemp: StarShipRequestModel = { results: [] };
          data.starships.map(element => {
              starshipTemp.url = element;
              starShipListTemp.results.push(starshipTemp);
              starshipTemp = {} as StarShipModel;
          });
          this.listStarships = starShipListTemp;
          this.getInfoStarships(this.listStarships)
      })
  }

  async loadPerson(){
    this.person$ = this.service.loadByID(this.id);
  }

  cancelar() {
      this.dialogRef.close();
  }

  async getInfoStarships(list: StarShipRequestModel) {
      const starShipList: StarShipRequestModel = { results: [] };
      await list.results.map( item  => {
          this.service.getStarship(item.url).subscribe(starship => {
              starShipList.results.push(<StarShipModel><unknown>starship);
          })
      })
      this.listStarships = starShipList;
  }

  async getImage(query: string){
      this.image$ = await this.serviceImage.getImage(query)

      this.image$.subscribe(image => {
          this.image = image.items[0].link
      })
  }

}
