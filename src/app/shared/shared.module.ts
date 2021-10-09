import { NgModule } from '@angular/core';
import { ImageSearchService } from './image-search.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [ ],
    imports: [ MatSnackBarModule ],
    exports: [ ],
    providers: [ ImageSearchService, ImageSearchService ],
  })
  export class SharedModule { }
  