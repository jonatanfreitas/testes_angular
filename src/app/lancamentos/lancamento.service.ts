import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class LancamentoFiltro{
  descricao?:string;
  dataVencimentoInicio?:Date;
  dataVencimentoFim?:Date;
  pagina=0;
  itensPorPagina=7;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl :string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.lancamentosUrl=`${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    //const headers = new HttpHeaders().append('Authorization','Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams()
                      .set('page',filtro.pagina)
                      .set('size',filtro.itensPorPagina);
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,{ params})
                    .toPromise()
                    // .then((response:any)=>response['content']
                    .then((response:any)=>{
                      const lanc = response['content'];

                      const resultado={
                        lanc,
                        total: response['totalElements']
                      }
                      return resultado;
                    });
  }
  excluir(codigo:number): Promise<any>{
    //const headers = new HttpHeaders().append('Authorization','Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
  }
  adicionar(lancamento: Lancamento): Promise<any> {
    // console.log(Lancamento.toJson(lancamento));
    // const headers = new HttpHeaders()
    //   .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    //   .append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, Lancamento.toJson(lancamento)).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<any> {
    // console.log((lancamento));
    // const headers = new HttpHeaders()
    //   .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    //   .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,Lancamento.toJson(lancamento))
      .toPromise()
      .then((response: any) => {
        // this.converterStringsParaDatas([response]);
        return response;
      });
  }


  buscarPorCodigo(codigo: number): Promise<any> {
    // const headers = new HttpHeaders()
    //   .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then((response:any)=>{
      //  this.converterStringsParaDatas([response]);
        return response;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento=moment(lancamento.dataVencimento).format('DD/MM/YYYY');
      lancamento.dataPagamento=moment(lancamento.dataPagamento).format('DD/MM/YYYY');
      // lancamento.dataVencimento = new Date(lancamento.dataVencimento!); //moment(lancamento.dataVencimento).format('DD/MM/YYYY');
      // lancamento.dataPagamento = new Date(lancamento.dataPagamento!); //moment(lancamento.dataPagamento).format('DD/MM/YYYY');

      // let offset = new Date().getTimezoneOffset() * 60000;

      // lancamento.dataVencimento = new Date(lancamento.dataVencimento!);
      // lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);
      if (lancamento.dataPagamento) {
        // lancamento.dataPagamento = new Date(lancamento.dataPagamento);
        // lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}

