import { Component, OnInit } from '@angular/core';
import { ListagemCategoria } from '../models/categoria.models';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { CategoriaService } from '../services/categoria.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listagem-categorias',
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
  templateUrl: './listagem-categorias.component.html',
  styleUrl: './listagem-categorias.component.scss'
})
export class ListagemCategoriasComponent implements OnInit {
  categorias$?: Observable<ListagemCategoria[]>;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
     this.categorias$ = this.categoriaService.selecionarTodos();
    }
}
