import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  quantity: number;

  constructor(private cartService: ShoppingCartService) {
    this.quantity = 0;
  }

  ngOnChanges() {
    if (this.shoppingCart !== undefined) {
      this.quantity = this.getQuantity();
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  private getQuantity(): number {
    const key = this.product.key;
    return this.shoppingCart.getQuantity(key);
  }
}
