import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/services/user.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { SearchService } from './shared/services/search.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './auth/helpers/jwt.interceptor';
import {AlertService} from './shared/services/alert.service';
import {AuthGuard} from './auth/guards/auth-guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import {MainModule} from './main/main.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessagesService} from './shared/services/messages.service';
import {GifUploadService} from './shared/services/gif-upload.service';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MainModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FacebookModule.forRoot(),
  ],
  providers: [
    UserService,
    GifUploadService,
    AuthenticationService,
    AlertService,
    AuthGuard,
    SearchService,
    MessagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
