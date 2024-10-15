import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CadastroNota, DetalhesNota, ListagemNota, NotaCriada, NotaExcluida } from '../../notas/models/nota.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivadasService {

  private readonly url = `${environment.API_URL}/arquivadas`;

  constructor(private http: HttpClient) { }

  cadastrar(novaArquivada: NotaCriada): Observable<NotaCriada> {
    return this.http.post<NotaCriada>(this.url, novaArquivada);
  }

  excluir(id: number) {
    const urlCompleto = `${this.url}/${id}`

    return this.http.delete<NotaExcluida>(urlCompleto)
  }

  selecionarTodos(): Observable<ListagemNota[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;

    return this.http.get<ListagemNota[]>(urlCompleto)
  }

  selecionarPorId(id: number) {
    const urlCompleto = `${this.url}?_expand=categoria`;

    return this.http.get<DetalhesNota>(urlCompleto);
  }
}
