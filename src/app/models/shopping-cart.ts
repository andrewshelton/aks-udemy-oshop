import { ShoppingCartItem } from './shopping-cart-item';
import { AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { OnDestroy, OnChanges, OnInit } from '@angular/core';
import { Product } from './product';

export interface ShoppingCartDTO {
  dateCreated: string;
  items: {[key: string]: ShoppingCartItem};
}

export class ShoppingCart implements OnDestroy {
  private sub: Subscription;
  private itemMap: {[key: string]: ShoppingCartItem};
  items: ShoppingCartItem[] = [];
  key: string;

  constructor(shoppingCart: ShoppingCartDTO) {
    this.itemMap = {...shoppingCart.items};
    const productKeys = Object.keys(this.itemMap);
    productKeys.forEach(key => {
      const item = this.itemMap[key];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    });
  }

  get totalItemCount(): number {
    if (this.items === undefined) {
      return 0;
    }

    let count = 0;
    this.items.forEach(item => {
      count += item.quantity || 0;
    });

    return count;
  }

  get totalPrice(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.totalPrice;
    });

    return total;
  }

  getQuantity(productKey: string): number {
    if ( !this.itemMap[productKey]) {
      return 0;
    }
    return this.itemMap[productKey].quantity || 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
