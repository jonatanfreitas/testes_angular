import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent  {
  tipos=[
          {label: 'Receita', value: 'RECEITA'},
          {label: 'Despesa', value: 'DESPESA'}
        ]
  categorias=[
          {label: 'Alimentação', value: '1'},
          {label: 'Transporte', value: '2'},
          {label: 'Educação', value: '3'},
          {label: 'Medico', value: '4'},
          {label: 'Academias', value: '5'}
        ]
        pessoas=[
          {label: 'Jonatan', value: '1'},
          {label: 'Sara', value: '2'},
          {label: 'Rafael', value: '3'},
          {label: 'Edio', value: '4'},
          {label: 'Neide', value: '5'},
          {label: 'Messias', value: '6'}
        ]



}
