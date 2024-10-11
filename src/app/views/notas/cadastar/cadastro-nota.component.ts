import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ListagemCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { NotaService } from '../services/nota.service';
import { CadastroNota } from '../models/nota.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-cadastro-nota',
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
    MatSelectModule,
    MatCardContent,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './cadastro-nota.component.html',
  styleUrl: './cadastro-nota.component.scss'
})
export class CadastroNotaComponent implements OnInit{
  notaform: FormGroup;
  categorias$?: Observable<ListagemCategoria[]>


  constructor(
    private router: Router,
    private categoriaService: CategoriaService ,
    private notaService?: NotaService,
    private notificacao?: NotificacaoService,
  ) {
    this.notaform = new FormGroup({
      titulo: new FormControl<string>(''),
      conteudo: new FormControl<string>(''),
      categoriaId: new FormControl<number>(0),
    })
  }

  ngOnInit(): void {
       this.categorias$ = this.categoriaService.selecionarTodos();
    }

  cadastrar(){
    const novaNota: CadastroNota = this.notaform.value;

    this.notaService?.cadastrar(novaNota).subscribe((res) =>{
      this.notificacao?.sucesso(`O registro ID [${res.id}] foi cadastrado com sucesso!`);

      this.router.navigate(['/notas']);
    })
  }

  campoEstaLimpo(campo:string): boolean{
    const controle = this.notaform.get(campo)

    if (!controle) return false;

    return controle.pristine;
  }
}
