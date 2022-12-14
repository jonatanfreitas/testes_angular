import { AuthService } from './../seguranca/auth.service';
import { RouterModule } from '@angular/router';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';


registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  imports: [CommonModule,
            ToastModule,
            ConfirmDialogModule,
            RouterModule,
            TranslateModule.forRoot({
              loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
              }
            })
          ],
  exports:[NavbarComponent,
    ToastModule,
    ConfirmDialogModule],
  providers: [
    LancamentoService,
    PessoaService,
    ConfirmationService,
    DatePipe,
    ErrorHandlerService,
    MessageService,
    TranslateService,
    AuthService,
    JwtHelperService
  ]
})
export class CoreModule { }
