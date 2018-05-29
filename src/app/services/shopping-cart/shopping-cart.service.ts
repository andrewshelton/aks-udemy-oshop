import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../../models/product';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart, ShoppingCartDTO } from '../../models/shopping-cart';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  public async getCart(): Promise<AngularFireObject<ShoppingCartDTO>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  public async addToCart(product: Product) {
    this.updateProductQuantity(product, 1);
  }

  public async removeFromCart(product: Product) {
    this.updateProductQuantity(product, -1);
  }

  public async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getProduct(cartId: string, productId: string): AngularFireObject<{}> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateProductQuantity(product: Product, delta: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getProduct(cartId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      const prod = {key: product.key, ...item.payload.val()};
      const payload = {};
      let quantity: number;
      if (prod.quantity === undefined) {
        payload['product'] = product;
        quantity = delta;
      } else {
        quantity = prod.quantity + delta;
      }

      if (quantity <= 0) {
        item$.remove();
      } else {
        payload['quantity'] = quantity;
        item$.update(payload);
      }
    });
  }
}
