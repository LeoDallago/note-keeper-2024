import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ListagemNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-listagem-notas',
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
    MatAnchor
  ],
  templateUrl: './listagem-notas.component.html',
  styleUrl: './listagem-notas.component.scss'
})
export class ListagemNotasComponent implements OnInit{
  notas$?: Observable<ListagemNota[]>;

  constructor(private notaService: NotaService) {
  }

  ngOnInit(): void {
     this.notas$ = this.notaService.selecionarTodos();
  }
}
