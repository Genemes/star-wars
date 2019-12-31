import { ListPeopleService } from './list-people.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageSearchService } from '../shared/image-search.service';
import { MatDialog } from "@angular/material";
import { PersonComponent } from '../person/person.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    peoples$: Observable<any>
    totalRecordsPerPage: number = 10
    pages: Array<number>
    currentPage: number = 1
    images: Observable<any>
    
    constructor(private service: ListPeopleService,
        private serviceImage: ImageSearchService,
        private dialog: MatDialog) {}

    ngOnInit() {
        this.listar(this.currentPage)
        this.peoples$.subscribe(
            response => {
                this.pages = new Array( (Math.floor( response.count / this.totalRecordsPerPage) ) + 1 )
            }
        )
    }

    listar(page){
        this.currentPage = this.incrementPage(page)
        return this.peoples$ = this.service.list(page)
    }

    getId(url: string){
        let aux = url.split("/")
        let position = aux.length - 2
        let id = aux[position]
        console.log('id: '+id)
        return id
    }

    add(url: string){
        let aux = url.split("/")
        let position = aux.length - 2
        let id = aux[position]
        
        let dialogRef = this.dialog.open(PersonComponent, {
            width: "80%",
            height: "90%",
            data : { data : id }
        });
        
    }

    //Função para exibir botao next
    next(){
        return this.currentPage < 9 ? true : false
    }
    //Função para exibir botao previous
    previous(){
        return this.currentPage > 2 ? true : false
    }
    //Função para incrementar currentPage
    incrementPage(page){
        return page === 10 ? 1 : page++
    }
    //Função para retornar currentPage
    page(){
        return this.currentPage
    }

    nextPage(){
        //verifica se currentPage é menor que 9
        if (this.currentPage < 9 ){
            this.listar(this.currentPage + 1)
            return true
        }else{
            this.listar(1)
            return false
        }
    }

    previousPage(){
        //verifica se currentPage é maior que 1
        if (this.currentPage > 1 ){
            this.listar(this.currentPage-1)
            return true
        }else{
            this.listar(this.pages.length)
            return false
        }
    }

}