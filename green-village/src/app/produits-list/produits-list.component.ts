import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { Produit } from '../models/produit.model';
import { produitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit{

  produits$!: Observable<Produit[]>;

  constructor(private produitService: produitsService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    const categorieId = +this.route.snapshot.params['id'];
    this.produits$ = this.produitService.getAllProduitsByCategorie(categorieId);
  }

}
