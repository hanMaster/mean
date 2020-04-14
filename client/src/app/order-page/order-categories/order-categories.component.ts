import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/interfaces';
import { CategoriesService } from '../../shared/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  constructor(
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetchAll();
  }
}
