import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();
  constructor(private pessoaService:PessoaService,
              private messageService: MessageService,
              private title: Title,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoas');
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }
  get editando(){
    return Boolean(this.pessoa.codigo)
  }
  atualizarTituloDescricao(){
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }
  carregarPessoa(codigoPessoa:number){
    this.pessoaService.buscarPorCodigo(codigoPessoa)
    .then(pessoa => { this.pessoa = pessoa;
                    this.atualizarTituloDescricao();
                    console.log(pessoa);
                  })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if(this.editando && codigoPessoa !== 'novo')
    {   console.log('Atualizar!');
        this.atualizarPessoa(form)
    }else{
        console.log('Adicionando!');
        this.adicionarPessoa(form);}
  }
  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then((pessoaAdicionada) => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        // form.reset();
        // this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas',pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then((pessoa: Pessoa) =>{ this.pessoa=pessoa;
                                 this.messageService.add({severity:'success', detail: 'Pessoa alterada com sucesso!'});
                                 this.atualizarTituloDescricao();
                                })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: NgForm) {
    form.reset;
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['/pessoas/novo']);
  }

}
