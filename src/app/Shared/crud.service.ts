import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Team } from '../Model/team.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public newTeamAdded = new Subject<Team>() ;
  public teamSelected = new Subject<Team>() ;

  constructor(private http: HttpClient) { }

  createNewTeam(newTeam: Team): Observable<any> {
    return this.http.post('http://final-assessment-33f84-default-rtdb.firebaseio.com/teams.json', newTeam)
    .pipe(catchError(this.handleError),
     map(key => {
      return key ;
    }));
  }

  readAllTeams(): Observable<any[]> {
   return this.http.get('http://final-assessment-33f84-default-rtdb.firebaseio.com/teams.json')
   .pipe(catchError(this.handleError),
    map((data: any[]) => {
    const tempArr = [] ;
    for (const key in data){
       if (key){
         tempArr.push({...data[key], id: key});
       }
     }
    return tempArr;
   }));
  }


  updateTeam(team: Team, id: string): Observable<any> {
    return this.http.put<Team>('http://final-assessment-33f84-default-rtdb.firebaseio.com/teams/' + id + '.json', team)
    .pipe(catchError(this.handleError));
  }

  deleteTeam(id: string): Observable<any> {
    return this.http.delete<Team>('http://final-assessment-33f84-default-rtdb.firebaseio.com/teams/' + id + '.json')
    .pipe(catchError(this.handleError));
  }


  private handleError(errorRes: HttpErrorResponse): any {
    console.log(errorRes.status);
    let errorMessage = 'Unknown error occurred' ;
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.status) {
      case 400 :
        errorMessage = 'Bad Request' ;
        break;
      case 401 :
        errorMessage = 'Unauthorized Access' ;
        break;
      case 404 :
        errorMessage = 'Requested Resource Not Found' ;
        break;
      case 405 :
        errorMessage = 'Request Action Not Allowed' ;
        break;
      case 408 :
        errorMessage = 'Request TimeOut' ;
        break;
      }
    return throwError(errorMessage);
  }
}

