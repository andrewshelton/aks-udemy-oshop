import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private subscriptions: Array<ISubscription> = [];

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    this.subscriptions.push( auth.user$.subscribe(user => {
        if (!user) {
          return;
        }

        userService.save(user);
        const currentUser = userService.get(user.uid);

        const returnUrl = localStorage.getItem('returnUrl') || '/';
        if (!returnUrl) {
          return;
        }

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);

      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
