import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router,
              private authService: AuthService){}

  onContinue(): void {
    this.router.navigateByUrl('categories')
  }

  onAddProduit(): void {
    this.router.navigateByUrl('/nouveau')
  }

  logout(){
    this.authService.logout();
  }
}
