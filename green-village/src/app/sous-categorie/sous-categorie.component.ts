import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/categorie.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.scss']
})
export class SousCategorieComponent implements OnInit {
  @Input() categorie!: Categorie;

  constructor(private router: Router,
              ){}

  ngOnInit(){
    console.log(this.categorie);
  }

  onViewproduitList(){
    this.router.navigateByUrl(`categories/${this.categorie.id}/produits`)
  }


}
