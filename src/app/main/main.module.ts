import { NgModule }                 from '@angular/core';
import { MainComponent }            from './main.component';
import { RouterModule }             from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { GeneratorComponent } from './generator/generator.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    MainComponent,
    RegistrationComponent,
    AuthorizationComponent,
    GeneratorComponent,
    SearchComponent
  ],
  imports: [RouterModule],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
