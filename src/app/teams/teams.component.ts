import { CrudService } from './../Shared/crud.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../Model/team.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  public allTeamsList: any[] = [] ;
  public editTeam = new Team('', '', 0);
  public delTeam ;
  public editIndex: number ;
  public updTeam ;
  public newTeam = new Team('', '', 0);
  public newT = new Team('', '', 0);
  public isLoading = true ;
  public newId: string ;


  errorMessage: string = null ;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private crudService: CrudService) { }

  ngOnInit(): void {

    this.crudService.readAllTeams()
    .subscribe(team => {
      this.allTeamsList = team ;
      console.log(this.allTeamsList);
      this.isLoading = false;
    },
    message => {
      this.errorMessage = message ;
      this.isLoading = false ;
    });

    this.crudService.newTeamAdded
    .subscribe(res => {
      this.newT = {...res} ;
      console.log(this.newT);
      this.allTeamsList.push({...this.newT, id: this.newId});
      console.log(this.allTeamsList);
   }) ;

  }
  onSelectTeam(index: number): void {
   this.crudService.teamSelected.next(this.allTeamsList[index]);
   this.router.navigate([index], {relativeTo: this.route});
  }

  onEdit(index: number): void {
    this.editTeam = {...this.allTeamsList[index]} ;
    this.editIndex  = index ;
    // console.log(this.editTeam);
  }

  onDelete(index: number): void {
    this.delTeam = {...this.allTeamsList[index]} ;
    console.log(this.delTeam);
    this.crudService.deleteTeam(this.delTeam.id).subscribe(
      response => {
        console.log(response);
        this.allTeamsList.splice(index, 1);
      },
      message => {
        this.errorMessage = message ;
        this.isLoading = false ;
      });
  }
  onSaveChanges(): void {
    this.updTeam = {...this.editTeam};
    console.log(this.updTeam);
    this.crudService.updateTeam(this.updTeam, this.updTeam.id)
    .subscribe(response => {
      this.allTeamsList[this.editIndex] = this.updTeam ;
      // this.crudService.teamSelected.next(this.allTeamsList[this.editIndex]);
      this.router.navigate([this.editIndex], {relativeTo: this.route});
      // console.log(this.editIndex);
      // console.log(this.allTeamsList);
      // this.editIndex = 0 ;
    },
    message => {
      this.errorMessage = message ;
      this.isLoading = false ;
    });
  }
  onCreate(): void {
   // console.log(this.newTeam);
   this.crudService.createNewTeam(this.newTeam)
   .subscribe(
     (resId: {name: string}) => {
        // const temp = [];
        // temp.push({...this.newTeam, id: resId.name});
        this.newId = resId.name ;
        this.crudService.newTeamAdded.next(this.newTeam);
     },
     message => {
      this.errorMessage = message ;
      this.isLoading = false ;
    });
  }
}
