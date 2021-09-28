import { TeamsComponent } from './teams/teams.component';
import { PortalComponent } from './portal/portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './teams/team/team.component';
import { AuthGaurdService } from './Shared/auth-gaurd.service';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';

const routes: Routes = [
  {path: 'portal' , component: PortalComponent, canActivate: [AuthGaurdService]} ,
  {path: 'login' , component: LoginComponent} ,
  {path: 'teams' , component: TeamsComponent, children: [
    {path: ':id' , component: TeamDetailsComponent} ,
  ]} ,
  {path: '' , redirectTo: '/portal', pathMatch: 'full'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
