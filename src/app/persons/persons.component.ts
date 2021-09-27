import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSearchService } from '../shared/image-search.service';
import { DetailComponent } from './detail/detail.component';
import { PeopleRequestModel, PersonModel } from './models/person.model';
import { PersonService } from './person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  totalRecordsPerPage: number = 10;
  pages!: Array<number>;
  currentPage: number = 1;
  people?: PeopleRequestModel;

  constructor(
    private service: PersonService,
    private serviceImage: ImageSearchService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    Promise.all([
      this.getPeople()
    ]).then(result => console.log('sucesso', this.people))
    .catch(err => console.log(err));
  }

  getPeople() {
    this.service.listAllPersons(this.currentPage)
      .toPromise()
      .then(people => {
        this.people = people;
        console.log(this.people);
        //Pagination
        this.pages = this.createArray(people.count);
      })
      .catch(err => console.log(err)) 
      .finally(() => {
        if(this.people) {
          this.getImages(this.people.results);
        }
      });
  }

  getImages(params: PersonModel[]) {
    this.serviceImage.getListImages(params)
    .toPromise()
    .then((results: any) => {
      this.people?.results.map((person, index) => {
         person.url = results[index].items[0].link;
      });
    })
    .catch((error: any) => console.log(error));
  }

  createArray(records: number): Array<number> {
    return new Array(Math.floor(records / this.totalRecordsPerPage) + 1);
  }

  getWeight(person: PersonModel) {
    return person.mass ? `${person.mass} kg` : person.mass;
  }

  getBackground(image: string = '../../assets/1.jpg') {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${image}')`);
  }

  //Função para incrementar currentPage
  incrementPage(page: number) {
    return page === this.pages.length ? 1 : ++page;
  }
  //Função para decrementar currentPage
  decrementPage(page: number) {
    return page === 1 ? this.pages.length : --page;
  }
  //Função para retornar currentPage
  selectPage(index: number) {
    this.currentPage = index;
    this.getPeople();
  }

  nextPage() {
      this.currentPage = this.incrementPage(this.currentPage);
      this.getPeople();
  }

  previousPage() {
      this.currentPage = this.decrementPage(this.currentPage);
      this.getPeople();
  }

  add(url: string) {
    const separator = url.split("/");
    const position = separator.length - 2;
    const id: number =  Number.parseInt(separator[position]);

    let dialogRef = this.dialog.open(DetailComponent, {
      width: "80%",
      height: "90%",
      data: { data: id }
    });
  }

}
