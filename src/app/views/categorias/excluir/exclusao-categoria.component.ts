import { Component, OnInit } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalhesCategoria } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-exclusao-categoria',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './exclusao-categoria.component.html',
  styleUrl: './exclusao-categoria.component.scss'
})
export class ExclusaoCategoriaComponent implements OnInit{
  id?: number;
  categoria$?: Observable<DetalhesCategoria>;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {}

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];

    if(!this.id){
      this.notificacao.erro('id nao encontrado')
      return;
    }

    this.categoria$ =  this.categoriaService.selecionarPorId(this.id)
    }

  excluir(){
    if(!this.id){
      this.notificacao.erro('id nao encontrado')
      return;
    }

    this.categoriaService
      .excluir(this.id)
      .subscribe((res) =>{

        this.notificacao.sucesso(`O registro ID [${this.id}] foi excluido com sucesso!`);
        this.router.navigate(['/categorias'])
      })
  }
}
