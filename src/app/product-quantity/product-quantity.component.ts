import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnChanges {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  quantity: number;

  constructor(private cartService: ShoppingCartService) { }

  ngOnChanges() {
    if (this.shoppingCart !== undefined) {
      this.quantity = this.getQuantity();
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  private getQuantity(): number {
    const key = this.product.key;
    return this.shoppingCart.getQuantity(key);
  }
}
