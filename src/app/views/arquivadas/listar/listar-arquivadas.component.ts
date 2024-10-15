import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListagemNota } from '../../notas/models/nota.models';
import { ArquivadasService } from '../services/arquivadas.service';

@Component({
  selector: 'app-listar-arquivadas',
  standalone: true,
  imports: [],
  templateUrl: './listar-arquivadas.component.html',
  styleUrl: './listar-arquivadas.component.scss'
})
export class ListarArquivadasComponent implements OnInit {
  arquivadas$?: Observable<ListagemNota[]>;


  constructor(
    private arquivadaService: ArquivadasService
  ) { }


  ngOnInit(): void {
    this.arquivadas$ = this.arquivadaService.selecionarTodos();
  }

}
