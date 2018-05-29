import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Observable } from '@firebase/util';
import { Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { ShoppingCart, ShoppingCartDTO } from '../models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: ShoppingCart;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.getProducts();
  }

  async ngOnInit() {
    const shoppingCart = await this.shoppingCartService.getCart();
    const shoppingCart$ = shoppingCart.valueChanges();
    this.subs.push(
      shoppingCart$.subscribe((cart: ShoppingCartDTO) => {
        this.cart = new ShoppingCart(cart);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private getProducts() {
    const productService$ = this.productService.getAll().switchMap(data => {
      this.filteredProducts = this.products = data;
      return this.route.queryParamMap;
    });
   this.subs.push(productService$.subscribe( params => this.subscribeToProducts(params)));
  }

  private subscribeToProducts(params: ParamMap) {
    this.category = params.get('category');
    this.applyFilter();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter( p => p.category === this.category) :
      this.products;
  }
}
