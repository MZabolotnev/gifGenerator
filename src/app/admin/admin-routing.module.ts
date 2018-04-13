import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {ManageUsersComponent} from './manage-users/manage-users.component';


const routes: Routes = [
  {path: '', component: AdminComponent,  children: [
    {path: '', component: ManageUsersComponent},
  ]}

];
// canActivate: [AdminAuthGuard], before children
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
