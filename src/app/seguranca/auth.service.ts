import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayLoad: any;
  constructor(private http:HttpClient,
              private jwtHelper: JwtHelperService) {
      this.carregarToken();
  }

  login(usuario:string, senha: string): Promise<void>{
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post(this.oauthTokenUrl, body, { headers })
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
}