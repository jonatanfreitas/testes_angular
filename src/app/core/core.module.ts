import { NavbarComponent } from './navbar/navbar.component';
import { NgModule , LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';


@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule],
  exports:[NavbarComponent],
  providers: [
    DatePipe
  ]
})
export class CoreModule { }
