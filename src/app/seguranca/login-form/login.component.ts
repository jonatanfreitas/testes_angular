import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private errorHandler: ErrorHandlerService,
              private router: Router) { }

  ngOnInit(): void {
  }
  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {this.router.navigate(['/lancamentos']);})
      .catch(erro => { this.errorHandler.handle(erro)} );
  }

}
