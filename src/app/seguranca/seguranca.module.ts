import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login-form/login.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,SegurancaRoutingModule,FormsModule,SegurancaRoutingModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class SegurancaModule { }
