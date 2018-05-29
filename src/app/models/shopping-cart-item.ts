import { Product } from './product';

export class ShoppingCartItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  get totalPrice() {
    const price = this.quantity * this.product.price;
    return price;
  }
}

