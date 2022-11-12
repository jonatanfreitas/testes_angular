import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { SelectButton } from 'primeng/selectbutton';
import { NgModule } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent

  ],
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
    ConfirmDialogModule
  ],
  providers: [LancamentoService,PessoaService,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
