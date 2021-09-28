import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Team } from 'src/app/Model/team.model';
import { CrudService } from 'src/app/Shared/crud.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public selectedTeam = new Team('', '', 0);
  public fullTeam: Team [] = [] ;
  public isRender = false;
  id: number;
  constructor(private crudService: CrudService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.crudService.teamSelected
    .subscribe(team => {
      this.selectedTeam = {...team} ;
      console.log(this.selectedTeam);
      this.isRender = true;
      console.log(this.isRender);
   }) ;
    
    // tslint:disable-next-line:no-string-literal
    this.id = this.route.snapshot.params['id'];
    this.crudService.readAllTeams()
    .subscribe(team => {
      this.selectedTeam = team[this.id] ;
      this.isRender = true;
      console.log( this.selectedTeam);
      this.fullTeam = team ;
    });
    this.route.params
    .subscribe((params: Params) => {
      console.log(params);
      // tslint:disable-next-line:no-string-literal
      this.id = params['id'];
      this.selectedTeam = this.fullTeam[this.id];
      this.isRender = true;
    });
    
    
  }
 
}
