import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListagemNota, NotaCriada } from '../../notas/models/nota.models';
import { ArquivadasService } from '../services/arquivadas.service';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconAnchor, MatAnchor } from '@angular/material/button';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { NotaService } from '../../notas/services/nota.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-listar-arquivadas',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatIcon,
    MatIconAnchor,
    NgForOf,
    RouterLink,
    MatTooltip,
    AsyncPipe,
    NgIf,
    MatAnchor,
    MatChipSet,
    MatChip,
    FormsModule,
    MatFormField
  ],
  templateUrl: './listar-arquivadas.component.html',
  styleUrl: './listar-arquivadas.component.scss'
})
export class ListarArquivadasComponent implements OnInit {
  arquivadas$?: Observable<ListagemNota[]>;


  constructor(
    private arquivadaService: ArquivadasService,
    private notaService: NotaService,
    private notificacao: NotificacaoService,
  ) { }


  public desArquivar(nota: NotaCriada) {
    this.arquivadaService.excluir(nota.id).subscribe()
    this.notaService.cadastrar(nota).subscribe()
    window.location.reload()
    this.notificacao.sucesso('Item Desarquivado com sucesso!!');
  }



  ngOnInit(): void {
    this.arquivadas$ = this.arquivadaService.selecionarTodos();
  }

}
