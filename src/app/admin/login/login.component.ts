import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthenticationService) { }

  email: string;
  password: string;
  errorMsg: string;

  signIn(){
    this.authService.login({email: this.email, password: this.password })
      .then(resolve => {
        this.router.navigate(['home'])
      })
      .catch(err => this.errorMsg = err.message)
    
  }

  ngOnInit() {
  }

}
