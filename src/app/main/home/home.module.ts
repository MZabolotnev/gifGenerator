import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home.component';
import { SearchComponent } from './search/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {PaginationPipe} from '../../shared/pipes/pagination.pipe';
import {GifModule} from '../../shared/components/gif/gif.module';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    GifModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    SearchComponent,
    PaginationPipe
  ],
  exports: [ReactiveFormsModule, FormsModule]
})
export class HomeModule {}
