import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class PessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 6;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas';
  constructor(private http: HttpClient) { }


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization','Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams()
                      .set('page',filtro.pagina)
                      .set('size',filtro.itensPorPagina);
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?`,{headers, params})
                    .toPromise()
                    // .then((response:any)=>response['content']
                    .then((response:any)=>{
                      const pessoasResp = response['content'];

                      const resultado={
                        pessoasResp,
                        total: response['totalElements']
                      }
                      return resultado;
                    });

}
listarTodas(): Promise<any> {
  const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  return this.http.get(this.pessoasUrl, { headers })
    .toPromise()
    .then((response: any) => response['content']);
}
excluir(codigo:number): Promise<any>{
  const headers = new HttpHeaders().append('Authorization','Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  return this.http.delete(`${this.pessoasUrl}/${codigo}`,{headers})
                  .toPromise();
}
mudarStatus(codigo:number, ativo:boolean): Promise<any>{
  const headers = new HttpHeaders().append('Authorization','Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                                   .append('Content-Type','application/json');
  return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`,ativo,{headers})
                  .toPromise();
}

}
