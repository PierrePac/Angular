import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-sous-categorie-list',
  templateUrl: './sous-categorie-list.component.html',
  styleUrls: ['./sous-categorie-list.component.scss']
})
export class SousCategorieListComponent implements OnInit{

  sousCategorie!: Categorie[];
  sousCategorie$!: Observable<Categorie[]>

  constructor(private categorieService: CategoriesService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    const categorieId = +this.route.snapshot.params['id'];
    this.sousCategorie$ = this.categorieService.getSousCategorie(categorieId);
  }

}
