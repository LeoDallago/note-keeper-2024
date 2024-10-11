import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DetalhesCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { DetalhesNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-exclusao-nota',
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
  templateUrl: './exclusao-nota.component.html',
})
export class ExclusaoNotaComponent implements OnInit{
  id?: number;
  nota$?: Observable<DetalhesNota>;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private notaService: NotaService,
    private notificacao: NotificacaoService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if(!this.id){
     this.notificacao.erro('id nao encontrado')
      return;
    }

    this.nota$ =  this.notaService.selecionarPorId(this.id)
  }

  excluir(){
    if(!this.id){
     this.notificacao.erro('id nao encontrado')
      return;
    }

    this.notaService
      .excluir(this.id)
      .subscribe((res) =>{

        this.notificacao.sucesso(`O registro ID [${this.id}] foi excluido com sucesso!`);
        this.router.navigate(['/notas'])
      })
  }
}
