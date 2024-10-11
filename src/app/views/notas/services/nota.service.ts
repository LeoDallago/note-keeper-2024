import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CadastroCategoria,
  CategoriaCriada,
  CategoriaEditada, CategoriaExcluida, DetalhesCategoria,
  EdicaoCategoria, ListagemCategoria
} from '../../categorias/models/categoria.models';
import { Observable } from 'rxjs';
import {
  CadastroNota,
  DetalhesNota,
  EdicaoNota,
  ListagemNota,
  NotaCriada,
  NotaEditada,
  NotaExcluida
} from '../models/nota.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private readonly url = `${environment.API_URL}/notas`;

  constructor(private http: HttpClient) { }

  cadastrar(novaNota: CadastroNota): Observable<NotaCriada> {
    return this.http.post<NotaCriada>(this.url, novaNota);
  }

  editar(id: number, notaEditada: EdicaoNota) {
    const urlCompleto = `${this.url}/${id}`;

    return this.http.put<NotaEditada>(urlCompleto,notaEditada);
  }

  excluir(id: number) {
    const urlCompleto = `${this.url}/${id}`;

    return this.http.delete<NotaExcluida>(urlCompleto)
  }

  selecionarTodos(): Observable<ListagemNota[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;

    return this.http.get<ListagemNota[]>(urlCompleto);
  }


  selecionarPorId(id: number) {
    const urlCompleto = `${this.url}?_expand=categoria`;

    return this.http.get<DetalhesNota>(urlCompleto);
  }
}
