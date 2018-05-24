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
    this.shoppingCart = {
      itemCount: 0,
      items: []
    };

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.shoppingCartService.getCart().then( cart => {
      cart.valueChanges().subscribe(cart$ => {
        this.shoppingCart.key = cart$.key;
        this.shoppingCart.itemCount = 0;

        const payload = {...cart$.items};
        const productKeys = Object.keys(payload);

        productKeys.forEach((key) => {
          this.shoppingCart.itemCount += payload[key].quantity || 0;
          this.shoppingCart.items.push(payload[key]);
        });
      });
    });
  }
}
