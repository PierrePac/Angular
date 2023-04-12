import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { Produit } from '../models/produit.model';
import { produitsService } from '../services/produits.service';
import { Categorie } from '../models/categorie.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit{
  @Input() produit!: Produit;
  @Input() photo!: Photo;
  @Input() categorie!: Categorie;

  photos$!: Observable<Photo[]>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private produitService: produitsService,){}


  ngOnInit(): void {
    console.log(this.categorie);
    this.photos$ = this.produitService.getMajorPictureOneProduit(this.produit.id);
  }

  onViewproduit(){
    const categorieId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`categories/${categorieId}/produits/${this.produit.id}`)
  }
}
