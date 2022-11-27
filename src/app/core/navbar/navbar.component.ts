import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  exibindoMenu: boolean = false;
  usuarioLogado: string = ''
  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ){
      this.usuarioLogado = this.auth.jwtPayLoad?.nome;
    }
    temPermissao(permissao: string) {
      return this.auth.temPermissao(permissao);
    }
    criarNovoAccessToken() {
      this.auth.obterNovoAccessToken();
    }
    logout() {
      this.auth.logout()
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
}
