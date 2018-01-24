import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuardService implements CanActivate {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
      this.user = afAuth.authState;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.user.map((auth) => {
        if (!auth) {
            this.router.navigateByUrl('/login');
            return false;
        }else{
          if(this.afAuth.auth.currentUser.uid !== 'DslRmIbFknh43ErnvUxhW0csa7R2') {
          alert('you are not authorized');
          this.router.navigate(['home'])
          return false
          }
        }
      return true;
    }).take(1);
}
  

}


