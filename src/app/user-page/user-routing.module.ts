import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPageComponent} from './user-page.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', component: UserPageComponent,  children: [
    {path: '', component: ProfileComponent},
  ]}

];
// canActivate: [AuthGuard], before children
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule {}
