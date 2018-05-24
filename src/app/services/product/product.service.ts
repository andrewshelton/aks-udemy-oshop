import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges().map(
      data =>
        data.map(product => {
          const key = product.key;
          return {key, ...product.payload.val()};
        })
    );
  }

  get(productId: string) {
    return this.db.object('/products/' + productId).snapshotChanges().map(
      product => {
        const key = product.key;
        return {key, ...product.payload.val()};
      });
  }

  update(productId: string, product: Product) {
    console.log('update product [', productId, ']: ', product);
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
