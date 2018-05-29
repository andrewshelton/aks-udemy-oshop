import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { AngularFireObject } from 'angularfire2/database';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  shoppingCart$: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {  }

  async ngOnInit() {
    await this.shoppingCartService.getCart().then(cart => {
      const cart$ = cart.valueChanges();
      this.sub = cart$.subscribe(cartSub => {
        this.shoppingCart$ = new ShoppingCart(cartSub);
      });
    });
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
