import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';
import { Routes }                 from '@angular/router';
import { AppComponent }           from '../app.component';
import { AuthorizationComponent } from '../pages/authorization/authorization.component';
import { MediaComponent }         from '../pages/media/media.component';
import { MediaDetailsComponent }  from '../pages/media-details/media-details.component';



const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'login', children: [
    { path: '', component: MediaComponent},
    { path: ':id', component: MediaDetailsComponent}
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
