import { NavbarComponent } from './navbar/navbar.component';
import { NgModule , LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule],
  exports:[NavbarComponent],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
