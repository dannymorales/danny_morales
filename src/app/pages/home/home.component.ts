import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private authService: AuthenticationService, private router: Router) { }


  ngOnInit() {
    this.user = this.authService.authUser()
  }

  logOut(){
    this.authService.logout().then(onResolved => this.router.navigate(['/']))
  }

}
