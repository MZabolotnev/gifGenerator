import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { GeneratorModule } from './generator/generator.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { GeneratorService } from './shared/services/generator.service';
import { SearchService } from './shared/services/search.service';
import { FileDropModule } from 'ngx-file-drop';
import { SortablejsModule } from 'angular-sortablejs';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SortablejsModule.forRoot({ animation: 150 }),
    HttpModule,
    AuthModule,
    SearchModule,
    GeneratorModule,
    AppRoutingModule,
    FileDropModule
  ],
  providers: [UsersService, AuthService, GeneratorService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
