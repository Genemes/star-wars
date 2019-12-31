import { NgModule } from '@angular/core';
import { ListService } from './list.service';
import { ImageSearchService } from './image-search.service';


@NgModule({
    declarations: [ ],
    imports: [ ],
    exports: [ ],
    providers: [ ListService, ImageSearchService ],
  })
  export class SharedModule { }
  