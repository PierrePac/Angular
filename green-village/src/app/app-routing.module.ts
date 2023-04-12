import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategorieListComponent } from "./categorie-list/categorie-list.component";
import { HomeComponent } from "./home/home.component";
import { NewProduitComponent } from "./new-produit/new-produit.component";
import { ProduitComponent } from "./produit/produit.component";
import { ProduitsListComponent } from "./produits-list/produits-list.component";
import { SousCategorieListComponent } from "./sous-categorie-list/sous-categorie-list.component";
import { SousCategorieComponent } from "./sous-categorie/sous-categorie.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'categories', component: CategorieListComponent },
    { path: 'categories/:id', component: SousCategorieListComponent },
    { path: 'nouveau', component: NewProduitComponent },
    { path: 'categories/:id/produits', component: ProduitsListComponent },
    { path: 'categories/:id/produits/:id', component: ProduitComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}