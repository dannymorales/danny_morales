import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from '../models'
import 'rxjs/Rx'
import * as firebase from 'firebase';


@Injectable()
export class AuthenticationService {
private uid: string;
private user: Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    this.user = afAuth.authState;

    this.afAuth.authState.subscribe(auth =>{
      if(auth !== undefined && auth !== null){
        this.uid = auth.uid
        console.log(this.uid)
      }else{
        console.log('you are not logged in')
      }
    });
  }
  login(user: User){
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)

  }

  logout(){
    return this.afAuth.auth.signOut();
  }
  authUser(){
    return this.user
  }
}
