import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category/product-category.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  productCategories$;
  product: Product = {
    title: '',
    price: null,
    imageUrl: null,
    category: null
  };
  productId: string;

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productCategories$ = productCategoryService.getAll();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.get(this.productId).take(1).subscribe( p => {
        this.product = p as Product;
      });
    }
  }

  save(product: Product) {
    if (this.productId) {
      this.productService.update(this.productId, product).then(success => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.create(product).then(success => {
        this.router.navigate(['/admin/products']);
      });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    console.log('product: ', this.product);
    this.productService.delete(this.productId).then(success => {
      this.router.navigate(['/admin/products']);
    });
  }

}
