import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  categories!: Categorie[];
  categories$!: Observable<Categorie[]>;

  constructor(private categoriesService: CategoriesService){}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
    
  }
}
