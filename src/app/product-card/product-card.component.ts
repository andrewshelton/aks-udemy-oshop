import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  quantity: number;

  constructor(private cartService: ShoppingCartService) { }

  ngOnChanges() {
    this.quantity = (this.shoppingCart !== undefined) ? this.getQuantity() : 0;
  }

  addToCart() {
    this.cartService.addToCart(this.product).then( success => {
      this.quantity = this.getQuantity();
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product).then (success => {
      this.quantity = this.getQuantity();
    });
  }

  private getQuantity(): number {
    const key = this.product.key;
    if (!this.shoppingCart || !this.shoppingCart.items || !this.shoppingCart.items[key]) {
      return 0;
    }
    return this.shoppingCart.items[key].quantity || 0;
  }
}
