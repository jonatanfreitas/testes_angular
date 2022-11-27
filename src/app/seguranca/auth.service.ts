import { environment } from './../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl :string;
  tokensRevokeUrl :string;
  jwtPayLoad: any;
  constructor(private http:HttpClient,private jwtHelper: JwtHelperService) {
      this.oauthTokenUrl=`${environment.apiUrl}/oauth/token`;
      this.tokensRevokeUrl=`${environment.apiUrl}/tokens/revoke`;
      this.carregarToken();
  }

  login(usuario:string, senha: string): Promise<void>{
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response:any) => {
        console.log(response);
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        console.log(response);
        if(response.status === 400){
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response['access_token']);

        console.log('Novo access token criado!');

        return Promise.resolve();
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve();
      });
  }
  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  public armazenarToken(token:string){
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayLoad);

    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayLoad = null;
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        console.log('Logout Realizado')
        this.limparAccessToken();
      });
  }
}
