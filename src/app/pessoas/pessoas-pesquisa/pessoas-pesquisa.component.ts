import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  {
  totalRegistros =0;
  filtro = new PessoaFiltro();
  pessoas = [];
  // { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
  //   { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
  //   { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
  //   { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
  //   { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
  //   { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  @ViewChild('tabela') grid!: Table;
  constructor(private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService,
              private messageService: MessageService,
              private confirmation:ConfirmationService,
              private title: Title){}
  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
    //this.pesq();
  }

  pesq(pagina=0){
    this.filtro.pagina=pagina;
    // const filtro: LancamentoFiltro = {
    //   descricao: this.descricao,
    //   dataVencimentoInicio: this.dataVencimentoInicio,
    //   dataVencimentoFim: this.dataVencimentoFim
    // };
    this.pessoaService.pesquisar(this.filtro)
      // .then((lanc) => {this.lancamentos=lanc});
      .then(resultado => {this.pessoas=resultado.pessoasResp;
                          this.totalRegistros=resultado.total;
                         })
      .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pesq(pagina);
  }

  confirmarExclusao(pessoa:any){
    this.confirmation.confirm({
      message:'Tem certeza que deseja excluir?',
      accept:()=>{this.excluir(pessoa);}
    });
  }

  excluir(pessoa:any){

    this.pessoaService.excluir(pessoa.codigo)
    .then(()=>{
      if (this.grid.first===0){this.pesq();} else {this.grid.reset();}
      this.messageService.add({  severity: 'success', detail: 'Lançamento excluído com sucesso!' })})
    .catch(erro => this.errorHandler.handle(erro));
  }
  alterarStatus(pessoa:any){
    const novoSatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.codigo,novoSatus)
    .then(()=>{
      const acao = novoSatus ? 'ativada' : 'desativada';
      // if (this.grid.first===0){this.pesq();} else {this.grid.reset();}
      pessoa.ativo=novoSatus;
      this.messageService.add({  severity: 'success', detail: `Pessoa ${acao} com sucesso!` })

    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
