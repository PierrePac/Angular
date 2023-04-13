import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  connexionForm!: FormGroup;

  token = localStorage.getItem('token');
  refreshToken = localStorage.getItem('refreshToken');

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,) {}
  
  ngOnInit(): void {
    this.connexionForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onsubmit() {
      this.authService.authentification(this.connexionForm.value);
  }

}
