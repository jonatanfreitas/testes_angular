import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros =0;
  filtro = new LancamentoFiltro();
  // descricao:string='';
  // dataVencimentoInicio?:Date;
  // dataVencimentoFim?:Date;
  lancamentos = [];
  @ViewChild('tabela') grid!: Table;
  constructor(private lancamentoService: LancamentoService,
              private errorHandler: ErrorHandlerService,
              private messageService: MessageService,
              private confirmation:ConfirmationService,
              private auth: AuthService,
              private title: Title){}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
    //this.pesq();
  }

  pesq(pagina=0){
    this.filtro.pagina=pagina;
    // const filtro: LancamentoFiltro = {
    //   descricao: this.descricao,
    //   dataVencimentoInicio: this.dataVencimentoInicio,
    //   dataVencimentoFim: this.dataVencimentoFim
    // };
    this.lancamentoService.pesquisar(this.filtro)
      // .then((lanc) => {this.lancamentos=lanc});
      .then(resultado => {this.lancamentos=resultado.lanc;
                          this.totalRegistros=resultado.total;
                              })
      .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pesq(pagina);
  }

  confirmarExclusao(lancamento:any){
    this.confirmation.confirm({
      message:'Tem certeza que deseja excluir?',
      accept:()=>{this.excluir(lancamento);}
    });
  }

  excluir(lancamento:any){

    this.lancamentoService.excluir(lancamento.codigo)
    .then(()=>{
      if (this.grid.first===0){this.pesq();} else {this.grid.reset();}
      this.messageService.add({  severity: 'success', detail: 'Lançamento excluído com sucesso!' })})
    .catch(erro => this.errorHandler.handle(erro));
  }
  naoTemPermissao(permissao: string) {
    return !this.auth.temPermissao(permissao);
  }


//   { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 5, 30),
//   dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
// { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2017, 5, 10),
//   dataPagamento: new Date(2017, 5, 30), valor: 80000, pessoa: 'Atacado Brasil' },
// { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2017, 6, 20),
//   dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
// { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017, 5, 5),
//   dataPagamento: new Date(2017, 4, 30), valor: 800, pessoa: 'Escola Abelha Rainha' },
// { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2017, 7, 18),
//   dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
// { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2017, 6, 10),
//   dataPagamento: new Date(2017, 6, 9), valor: 1750, pessoa: 'Casa Nova Imóveis' },
// { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 6, 13),
//   dataPagamento: null, valor: 180, pessoa: 'Academia Top' }

}
