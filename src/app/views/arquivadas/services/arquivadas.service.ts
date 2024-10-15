import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CadastroNota, DetalhesNota, ListagemNota, NotaCriada } from '../../notas/models/nota.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivadasService {

  private readonly url = `${environment.API_URL}/arquivadas`;

  constructor(private http: HttpClient) { }

  cadastrar(novaArquivada: CadastroNota): Observable<NotaCriada> {
    return this.http.post<NotaCriada>(this.url, novaArquivada);
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
