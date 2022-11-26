import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,
              private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //if (state.url === '/lancamentos/novo')
      if (this.auth.isAccessTokenInvalido()) {
        console.log('Navegação com access token inválido. Obtendo novo token...');
        return this.auth.obterNovoAccessToken()
          .then(() => {
            if (this.auth.isAccessTokenInvalido()) {
              this.router.navigate(['/login']);
              return false;
            }
            return this.podeAcessarRota(route.data['roles'] );
          })
      }
      else
        return this.podeAcessarRota(route.data['roles'] );
  }
  podeAcessarRota(roles: string[]): boolean {
    if (roles && !this.auth.temQualquerPermissao(roles)) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }
}
