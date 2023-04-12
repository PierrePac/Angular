import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { ResponsePhoto } from '../interface/reponsePhoto.interface';
import { Categorie } from '../models/categorie.model';
import { Photo } from '../models/photo.model';
import { Produit } from '../models/produit.model';
import { CategoriesService } from '../services/categories.service';
import { produitsService } from '../services/produits.service';
import { uploadService } from '../services/upload.servive';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  @Input() produit!: Produit;
  @Input() photo!: Photo;
  @Input() categorie!: Categorie;


  produits!: Produit;
  produit$!: Observable<Produit>;
  majorPhoto$!: Observable<Photo[]>;
  otherPhotos$!: Observable<Photo[]>;
  categories$!: Observable<Categorie[]>
  file!: File;
  produitForm!: FormGroup;
  photoForm!: FormGroup;
  produitDetail: any =[];

  
    constructor(private produitService: produitsService,
                private route: ActivatedRoute,
                private categoriesService: CategoriesService,
                private formbuilder: FormBuilder,
                private uploadService: uploadService,
                private router: Router,
                ){}

  
    ngOnInit(){
      console.log(this.categorie);
      const produitId = +this.route.snapshot.params['id'];
      this.produit$ = this.produitService.getOneProduit(produitId);
      this.otherPhotos$ = this.produitService.getOtherPictureOfOneProduit(produitId);
      this.majorPhoto$ = this.produitService.getMajorPictureOneProduit(produitId);
      this.categories$ = this.categoriesService.getAllSousCategories();
      
      this.produitForm = this.formbuilder.group({
        refProduit: ['', Validators.required],
        shortLibel: ['', Validators.required],
        longLibel: [ '', Validators.required],
        idCategorie: ['', Validators.required],
        prixHt: ['', Validators.required],
      });
      this.photoForm = this.formbuilder.group({
        photo: [null, Validators.required]
      });
    }

    onFilechange(event: any) {
      this.file = event.target.files[0];
    }
    
    upload() {
      const produitId = +this.route.snapshot.params['id'];
      if (this.file) {
        this.uploadService.uploadFile(this.file).subscribe((response: ResponsePhoto) => {
          console.log(response.nom);
          this.uploadService.uploadPhoto(response.nom, produitId).pipe(delay(2000)).subscribe();
          this.ngOnInit();
          alert("Image chargé sur le serveur");
        });
      } else {
        alert("please select a file first")
      }
    }
    deletePicture(picId: number){
      this.uploadService.deletePicture(picId).subscribe();
      this.ngOnInit();
    }

    promotePicture(picId: number, prodId: number, majorPicId: number){
      this.uploadService.PromotedPicture(picId, majorPicId);
      this.ngOnInit();
    }

    onModify(){
      const produitId = +this.route.snapshot.params['id'];
      this.uploadService.modifyProduit(produitId, this.produitForm.value);
      this.ngOnInit();
    }

    onDelete(){
      const produitId = +this.route.snapshot.params['id'];
      this.uploadService.deleteProduit(produitId);
      alert("Produit supprimé")
      this.router.navigateByUrl('');
    }
  }
