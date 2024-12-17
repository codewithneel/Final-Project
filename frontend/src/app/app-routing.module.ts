import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{ path: "home", component: HomeComponent }, {path:"company", component:CompanyComponent}, {path:"teams", component:TeamsComponent}, {path:"users", component:UsersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
