import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Category } from '../../models/category';
import { ProductCategoryService } from '../../services/product-category/product-category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category: string;

  categories$;

  constructor(
    private route: ActivatedRoute,
    private categoryService: ProductCategoryService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

}
