import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';
import firebase from '@firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../../models/app-user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
      this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', returnUrl);

    const authProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(authProvider)
      .catch(err => {
        console.log('Login Redirect Error: ', err);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(success => {
        console.log('pre-logout url: ', this.router.url);
        localStorage.clear();
        this.router.navigate(['/']);
        console.log('post-logout url: ', this.router.url);
      })
      .catch(err => {
        console.log('Logout Redirect Error: ', err);
      });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }
}
