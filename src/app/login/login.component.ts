import { User } from './../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, AuthResponse } from '../Shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = null ;
  loginObserver: Observable<AuthResponse> ;


  constructor(private auth: AuthenticationService,
              private router: Router) { }

 
ngOnInit(): void {
}

onSubmit(form: NgForm): void{
// console.log(form);
this.loginObserver = this.auth.toLogIn(form.value.email, form.value.password);
this.loginObserver.subscribe(
response => {
// console.log(response);
form.reset();
this.router.navigate(['/portal']);

},
message => {
  this.errorMessage = message ;
  // this.isLoading = false ;
}
);
form.reset() ;
}
}
