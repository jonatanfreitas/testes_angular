import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { SelectButton } from 'primeng/selectbutton';
import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Dropdown } from 'primeng/dropdown';
import {DropdownModule} from 'primeng/dropdown';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import {InputMaskModule} from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';

import { registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader { return new TranslateHttpLoader(http);}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule,
    FormsModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [LancamentoService,
              PessoaService,
              MessageService,
              ConfirmationService,
              TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
