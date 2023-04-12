import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './produit/produit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewProduitComponent } from './new-produit/new-produit.component';
import { HttpClientModule } from '@angular/common/http';
import { SousCategorieComponent } from './sous-categorie/sous-categorie.component';
import { SousCategorieListComponent } from './sous-categorie-list/sous-categorie-list.component';
import { ProduitsListComponent } from './produits-list/produits-list.component';
import { ProduitsComponent } from './produits/produits.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnexionComponent } from './connexion/connexion.component';
import { httpInterceptorProviders } from './interceptors';




@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    CategorieListComponent,
    HeaderComponent,
    HomeComponent,
    ProduitComponent,
    NewProduitComponent,
    SousCategorieComponent,
    SousCategorieListComponent,
    ProduitsListComponent,
    ProduitsComponent,
    ConnexionComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}
