import { ListPeopleService } from "./list-people.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ImageSearchService } from "../shared/image-search.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from "@angular/material";
import { PersonComponent } from "../person/person.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  peoples$: Observable<any>;
  observable$: Observable<any>;
  totalRecordsPerPage: number = 10;
  pages: Array<number>;
  currentPage: number = 1;

  listQueries: Array<string> = new Array(10);

  constructor(
    private service: ListPeopleService,
    private serviceImage: ImageSearchService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.peoples$ = this.listar(this.currentPage);
    this.peoples$.subscribe(response => {
      //Paginação
      this.pages = new Array(
        Math.floor(response.count / this.totalRecordsPerPage) + 1
      );

      this.listQueries = response.results.map(function(element, index) {
        let obj = new Object();
        obj["id"] = index;
        obj["query"] = element.name;
        //obj["url"] = "../../assets/1.jpg";
        obj["url"] = "https://cdn.wallpapersafari.com/41/13/wibJE8.png";
        return obj;
      });
      this.preenchelistUrls();
    });
  }

  async preenchelistUrls() {
    this.listQueries.map(item => {
      let query = item["query"];
      this.serviceImage.getImage(query).subscribe(response => {
        let url = response['items'][0]['link']
        let obj = new Object();
        obj["id"] = item["id"];
        obj["query"] = item["query"];
        item["url"] = url;
        return obj;
      });
    });
  }

  async preencheListQuery(page) {
    this.peoples$ = this.listar(page);
    this.peoples$.subscribe(response => {
      this.listQueries = response.results.map(function(element, index) {
        let obj = new Object();
        obj["id"] = index;
        obj["query"] = element.name;
        obj["url"] =
          "https://vignette.wikia.nocookie.net/p__/images/2/2b/OwenLars1.jpg/revision/latest?cb=20170529131545&path-prefix=protagonist";
        return obj;
      });
      this.preenchelistUrls();
    });
  }

  listar(page) {
    this.currentPage = this.incrementPage(page);
    return this.service.list(page);
  }

  getId(url: string) {
    let aux = url.split("/");
    let position = aux.length - 2;
    let id = aux[position];
    console.log("id: " + id);
    return id;
  }

  add(url: string) {
    let aux = url.split("/");
    let position = aux.length - 2;
    let id = aux[position];

    let dialogRef = this.dialog.open(PersonComponent, {
      width: "80%",
      height: "90%",
      data: { data: id }
    });
  }

  //Função para exibir botao next
  next() {
    return this.currentPage < 9 ? true : false;
  }
  //Função para exibir botao previous
  previous() {
    return this.currentPage > 2 ? true : false;
  }
  //Função para incrementar currentPage
  incrementPage(page) {
    return page === 10 ? 1 : page++;
  }
  //Função para retornar currentPage
  page() {
    return this.currentPage;
  }

  nextPage() {
    //verifica se currentPage é menor que 9
    if (this.currentPage < 9) {
      //this.listar(this.currentPage + 1)
      this.preencheListQuery(this.currentPage + 1);
      return true;
    } else {
      //this.listar(1)
      this.preencheListQuery(1);
      return false;
    }
  }

  previousPage() {
    //verifica se currentPage é maior que 1
    if (this.currentPage > 1) {
      //this.listar(this.currentPage-1)
      this.preencheListQuery(this.currentPage - 1);
      return true;
    } else {
      this.listar(this.pages.length);
      this.preencheListQuery(this.pages.length);
      return false;
    }
  }

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${image}')`);
  }
}
