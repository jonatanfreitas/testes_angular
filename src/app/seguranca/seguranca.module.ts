import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login-form/login.component';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,SegurancaRoutingModule,FormsModule,SegurancaRoutingModule,
    InputTextModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
        }
      }
    ),
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
