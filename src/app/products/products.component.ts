import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Observable } from '@firebase/util';
import { Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart = {};

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute
  ) {
    this.sub =
      this.productService.getAll().switchMap(data => {
        this.filteredProducts = this.products = data;
        return route.queryParamMap;
      }).subscribe( params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter( p => p.category === this.category) :
          this.products;
      });
  }

  ngOnInit() {
    this.shoppingCartService.getCart()
      .then(cart => {
        cart.valueChanges().subscribe(c => {
          this.cart = c;
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
