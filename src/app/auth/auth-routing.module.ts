import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ResetComponent} from './reset/reset.component';

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegisterComponent},
    {path: 'reset', component: ResetComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
