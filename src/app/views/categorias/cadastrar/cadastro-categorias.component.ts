import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { CadastroCategoria } from '../models/categoria.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-cadastro-categorias',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAnchor,
    MatCard,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconAnchor,
    MatTooltip,
    NgForOf,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatButton,
    MatPrefix,
    RouterLink,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './cadastro-categorias.component.html',
})
export class CadastroCategoriasComponent {

  categoriaForm: FormGroup;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private notficacao: NotificacaoService
  ) {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    });
  }

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  cadastrar() {
    if(this.categoriaForm.invalid)return

    const novaCategoria: CadastroCategoria = this.categoriaForm.value;

    this.categoriaService.cadastrar(novaCategoria).subscribe((res) => {
      this.notficacao.sucesso(`O registro ID [${res.id}] foi cadastrado com sucesso!`);

      this.router.navigate(['/categorias']);
    });
  }
}
