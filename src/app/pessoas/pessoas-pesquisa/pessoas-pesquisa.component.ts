import { LazyLoadEvent } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private pessoaService: PessoaService){}

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
                         });
  }
  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pesq(pagina);
  }
}
