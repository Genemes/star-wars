import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ImagesService } from '../images-services/images-services.component';
import { error } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { map } from 'rxjs/operators';
interface imagelistexpander {
  (title: string): any;
}

declare var jQuery: imagelistexpander;

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})

export class ImagesListComponent implements OnInit, AfterViewChecked {
  images: any[];
  info: any[];

  imagesFound: boolean = false;
  searching: boolean;
  handleSuccess(data) {
    this.imagesFound = true;
    this.images = data.items;
    console.log(data.items);
  }
  handelError(error) {
    console.log(error);
  }

  constructor(
    private _imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['search']) {
        this.searchImages(params['search']);
      }
    });
  }

  searchImages(query: string) {
    this.searching = true;
    return this._imagesService.getImage(query).subscribe(
      data => this.handleSuccess(data),
      error => this.handelError(error),
      () => this.searching = false
    );
  }
  onSearchImages(query: string) {
    this.router.navigate(['images-list', { search: query }])
    this.route.params.subscribe(params => this.searchImages(params['search']));
  }
  ngOnInit() {
  }

  ngAfterViewChecked() {

    (function (global, $) {
      $('.gallery-items').imagelistexpander({
        prefix: "gallery-"
      });
    })(this, jQuery);
  }

  sendMeHome() {
    this.router.navigate(['']);
  }
}

