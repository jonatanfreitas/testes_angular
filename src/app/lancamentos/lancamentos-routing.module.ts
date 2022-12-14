import { AuthGuard } from './../seguranca/auth.guard';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard], data:{ roles:['ROLE_PESQUISAR_LANCAMENTO'] }},
  { path: 'novo', component: LancamentoCadastroComponent,
    canActivate: [AuthGuard], data:{ roles:['ROLE_CADASTRAR_LANCAMENTO'] } },
  { path: ':codigo', component: LancamentoCadastroComponent,
    canActivate: [AuthGuard], data:{ roles:['ROLE_CADASTRAR_LANCAMENTO'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[]
})
export class LancamentosRoutingModule { }
