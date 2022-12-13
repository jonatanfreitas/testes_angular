import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: PessoasPesquisaComponent },
  { path: 'novo', component: PessoaCadastroComponent },
  { path: ':codigo', component: PessoaCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[]
})
export class PessoasRoutingModule { }
