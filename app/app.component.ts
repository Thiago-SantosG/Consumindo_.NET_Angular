import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pessoa } from './models/pessoa';
import { JsonPipe, AsyncPipe, NgForOf} from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, NgForOf, FormsModule], 
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {
  
  title = 'Consumir-Api';
  http = inject(HttpClient);
  urlApi = 'https://localhost:7066'

  //Listar Pessoas
  pessoas$?: Observable<Pessoa[]>;

  //Buscar Pessoa
  pessoaEncontrada$?: Observable<Pessoa>;
  valorBuscaPessoa = '';

  //Adicionar pessoa
  nomeAdicionar = '';

  //Atualizar uma pessoa
  idAtualizar = '';
  nomeAtualizar = '';


  ngOnInit(): void {
    this.obterpessoas();
  }

  obterpessoas(){
    this.pessoas$ = this.http.get<Pessoa[]>(`${this.urlApi}/pessoas`);
  }

  obterPessoaespecifica(){
    if (!this.valorBuscaPessoa)
      return;
    this.pessoaEncontrada$ = this.http.get<Pessoa>(`${this.urlApi}/pessoas/${this.valorBuscaPessoa}`)
  }

  adicionarPessoa(){
    if (!this.nomeAdicionar)
      return;

    const pessoaCriar: Pessoa = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nome: this.nomeAdicionar,
    }

    this.http.post<void>(`${this.urlApi}/pessoas`, pessoaCriar)
      .subscribe(_ => {
        this.obterpessoas()
        this.nomeAdicionar = '';
      });
  }

  obterDadosAtualizar(pessoa: Pessoa){
      console.log(pessoa)

      this.idAtualizar = pessoa.id;
      this.nomeAtualizar = pessoa.nome;
  }

  atualizarNome(){
    if(this.nomeAtualizar || !this.nomeAtualizar)
      return;

    const pessoa: Pessoa = {id: this.idAtualizar, nome: this.nomeAtualizar}

    const url = `${this.urlApi}/pessoas/${this.idAtualizar}`

    this.http.put<Pessoa>(url, pessoa)
    .subscribe(_ => {this.obterpessoas(), this.nomeAtualizar = '';})
  }
}
