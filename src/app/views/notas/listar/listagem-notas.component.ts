import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { filter, Observable } from 'rxjs';
import { ListagemNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
import { map } from 'rxjs/operators';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ListagemCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';

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
    MatAnchor,
    MatChipSet,
    MatChip,
    FormsModule,
    MatFormField
  ],
  templateUrl: './listagem-notas.component.html',
  styleUrl: './listagem-notas.component.scss'
})
export class ListagemNotasComponent implements OnInit{
  notas$?: Observable<ListagemNota[]>;
  categorias$?: Observable<ListagemCategoria[]>;

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
  ) {
  }

  public filtrar(filtro: string) {
    if(filtro == '')
      return this.notas$ = this.notaService.selecionarTodos()

      const resultado = this.notaService.selecionarTodos().pipe(
       map(f => f.filter(r => r.categoria.titulo == filtro))
      )

    return this.notas$ = resultado;
  }


  ngOnInit(): void {
     this.notas$ = this.notaService.selecionarTodos()
     this.categorias$ = this.categoriaService.selecionarTodos();
  }
}
