import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent  implements OnInit{
  lancamento: Lancamento = new Lancamento();
  tipos=[
          {label: 'Receita', value: 'RECEITA'},
          {label: 'Despesa', value: 'DESPESA'}
        ]
  categorias: any[] = [];
          // {label: 'Alimentação', value: '1'},
          // {label: 'Transporte', value: '2'},
          // {label: 'Educação', value: '3'},
          // {label: 'Medico', value: '4'},
          // {label: 'Academias', value: '5'}

        pessoas: any[] = [];
          // {label: 'Jonatan', value: '1'},
          // {label: 'Sara', value: '2'},
          // {label: 'Rafael', value: '3'},
          // {label: 'Edio', value: '4'},
          // {label: 'Neide', value: '5'},
          // {label: 'Messias', value: '6'}


constructor(private categoriaService:CategoriaService,
            private pessoaService:PessoaService,
            private lancamentoService:LancamentoService,
            private messageService: MessageService,
            private errorHandler: ErrorHandlerService){}
ngOnInit(): void {
  this.carregarCategorias();
  this.carregarPessoas();
}
carregarCategorias(){
  return this.categoriaService.listarTodas()
  .then(categorias => {
    this.categorias = categorias.map( (c:any) => ({label: c.nome, value: c.codigo}))
  })
  .catch(erro => this.errorHandler.handle(erro));
}
carregarPessoas(){
  return this.pessoaService.listarTodas()
  .then(pessoas => {
    this.pessoas = pessoas.map( (c:any) => ({label: c.nome, value: c.codigo}))
  })
  .catch(erro => this.errorHandler.handle(erro));
}
salvar(form: NgForm) {
  console.log(this.lancamento);

  this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
}
}
