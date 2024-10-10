import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { CadastroCategoria, DetalhesCategoria, EdicaoCategoria } from '../models/categoria.models';

@Component({
  selector: 'app-edicao-categoria',
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
    MatError,
  ],
  templateUrl: './edicao-categoria.component.html',
})
export class EdicaoCategoriaComponent implements OnInit{
  categoriaForm: FormGroup;
  id?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    });
  }


  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if(!this.id){
      console.error('id nao encontrado')
      return;
    }

    this.categoriaService.selecionarPorId(this.id).subscribe((res) =>{
      const categoriaSelecionada: DetalhesCategoria = res;

      this.carregarFormulario(categoriaSelecionada)
    })
    }

  editar() {
    if(this.categoriaForm.invalid)return

    if(!this.id){
      console.error('id nao encontrado')
      return;
    }

    const categoriaEditada: EdicaoCategoria = this.categoriaForm.value;

    this.categoriaService.editar(this.id ,categoriaEditada).subscribe((res) => {
      console.log(`O registro ID [${res.id}] foi editado com sucesso!`);

      this.router.navigate(['/categorias']);
    });
  }

  private carregarFormulario(registro: DetalhesCategoria){
    this.categoriaForm.patchValue(registro);
  }
}
