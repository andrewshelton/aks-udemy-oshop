import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductCategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', query => query.orderByChild('name')).snapshotChanges()
      .map( c =>
        c.map( x => {
          const key = x.key;
          return {key, ...x.payload.val()};
        }));
  }
}
