import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/categorie.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  @Input() categorie!: Categorie;

  constructor(private router: Router){}

  ngOnInit(){
  }

  onViewSousCategorie(){
    this.router.navigateByUrl(`categories/${this.categorie.id}`)
  }

}
