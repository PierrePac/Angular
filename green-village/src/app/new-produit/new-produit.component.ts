import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, map, Observable, tap } from 'rxjs';
import { ResponsePhoto } from '../interface/reponsePhoto.interface';
import { ResponseProduit } from '../interface/reponseProduit.interface';
import { Categorie } from '../models/categorie.model';
import { Produit } from '../models/produit.model';
import { CategoriesService } from '../services/categories.service';
import { uploadService } from '../services/upload.servive';

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.scss']
})
export class NewProduitComponent implements OnInit {

  produitForm!: FormGroup;
  photoForm!: FormGroup;
  photoPrincipalForm!: FormGroup;
  produitpreview$!: Observable<Produit>;
  newProduit!: Produit;
  categories$!: Observable<Categorie[]>;
  file!: File;
  images!: string[];
  imagePrincipale!: string;
  idNewProduit!: number;

  constructor(private formbuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private http: HttpClient,
    private uploadService: uploadService,
    private router: Router) { }

  ngOnInit(): void {
    this.images = [];

    this.categories$ = this.categoriesService.getAllSousCategories();

    this.produitForm = this.formbuilder.group({
      refProduit: [null, Validators.required],
      shortLibel: [null, Validators.required],
      longLibel: [null, Validators.required],
      idCategorie: [null, Validators.required],
      prixHt: [null, Validators.required],
    });
    this.produitpreview$ = this.produitForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0,
      }))
    );
    this.photoPrincipalForm = this.formbuilder.group({
      photoPrincipal: [null, Validators.required]
    });
    this.photoForm = this.formbuilder.group({
      photo: [null, Validators.required]
    });
  }

  onSubmitForm() {
    this.uploadService.uploadProduit(this.produitForm.value).subscribe((response: ResponseProduit) => {
      this.idNewProduit = response.id;
      this.onSubmitPictures(this.idNewProduit);
    });
  }
  
  onSubmitPictures(idNewProduit: number){
    this.uploadService.uploadPhotoPrincipale(this.imagePrincipale, idNewProduit).pipe(delay(2000)).subscribe();
    this.images.forEach(image => {
      this.uploadService.uploadPhoto(image, idNewProduit).pipe(delay(2000)).subscribe();
    });
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  uploadPrincipale(){
    if (this.file) {
      this.uploadService.uploadFile(this.file).subscribe((response: ResponsePhoto) => {
        alert("Image chargé sur le serveur");
        this.imagePrincipale = response.nom;
      })
    } else {
      alert("please select a file first")
    }
  }
  
  upload() {
    if (this.file) {
      this.uploadService.uploadFile(this.file).subscribe((response: ResponsePhoto) => {
        alert("Image chargé sur le serveur");
        this.images.push(response.nom);
      })
    } else {
      alert("please select a file first")
    }
  }




}
