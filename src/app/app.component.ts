import { User } from './Model/user.model';
import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from './Shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-assesment';
  isLoggedIn = false;

  constructor(private auth: AuthenticationService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.auth.currUser.pipe(
      take(1),
      map((user: User) => {
         this.isLoggedIn = !!user ;
         console.log(this.isLoggedIn);
      }));
    this.auth.toAutoLogin();
  }

  logOut(): void{
    this.auth.toLogOut();
  }
}
