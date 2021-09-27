import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImagesServicesComponent, ImagesService } from './images-services/images-services.component';
import { FooterComponent } from './footer/footer.component';
import {enableProdMode} from '@angular/core';
enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImagesListComponent,
    ImagesServicesComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ImagesService,
    HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
