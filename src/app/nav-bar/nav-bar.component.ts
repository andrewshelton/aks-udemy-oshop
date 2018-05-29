import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private sub: Subscription;
  appUser: AppUser;
  shoppingCart: ShoppingCart;

  logout() {
    this.auth.logout();
  }

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    await this.shoppingCartService.getCart().then(cart => {
      const cart$ = cart.valueChanges();
      this.sub = cart$.subscribe(cartSub => {
        this.shoppingCart = new ShoppingCart(cartSub);
      });
    });
  }
}
