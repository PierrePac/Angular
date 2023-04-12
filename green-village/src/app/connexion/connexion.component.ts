import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ReponseToken } from '../interface/reponseToken.interface';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  connexionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,) {}
  
  ngOnInit(): void {
  
    this.connexionForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  private token!: string;
  private refresh_token!: string;

  onsubmit() {
      this.authService.authentification(this.connexionForm.value);

  }

}
