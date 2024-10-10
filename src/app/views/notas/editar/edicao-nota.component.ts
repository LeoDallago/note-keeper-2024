import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { DetalhesCategoria, ListagemCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { NotaService } from '../services/nota.service';
import { CadastroNota, DetalhesNota } from '../models/nota.models';

@Component({
  selector: 'app-edicao-nota',
  standalone: true,
    imports: [
        AsyncPipe,
        MatAnchor,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatFormField,
        MatHint,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatPrefix,
        MatSelect,
        MatSuffix,
        NgForOf,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './edicao-nota.component.html',
})
export class EdicaoNotaComponent implements OnInit{
  id?: number;
  notaform: FormGroup;
  categorias$?: Observable<ListagemCategoria[]>


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService ,
    private notaService?: NotaService,
  ) {
    this.notaform = new FormGroup({
      titulo: new FormControl<string>(''),
      conteudo: new FormControl<string>(''),
      categoriaId: new FormControl<number>(0),
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if(!this.id){
      console.error('id nao encontrado')
      return;
    }

    this.notaService?.selecionarPorId(this.id).subscribe((res)=>{
      this.carregarFormulario(res)
    })

    this.categorias$ = this.categoriaService.selecionarTodos();
  }

  editar(){
    if(!this.id){
      console.error('id nao encontrado')
      return;
    }

    const notaEditada: CadastroNota = this.notaform.value;

    this.notaService?.editar(this.id,notaEditada).subscribe((res) =>{
      console.log(`O registro ID [${res.id}] foi editado com sucesso!`);

      this.router.navigate(['/notas']);
    })
  }

  campoEstaLimpo(campo:string): boolean{
    const controle = this.notaform.get(campo)

    if (!controle) return false;

    return controle.pristine;
  }

  private carregarFormulario(registro: DetalhesNota){
    this.notaform.patchValue(registro);

 const campos =  Object.keys(this.notaform.controls)

    for (let campo of campos){
     const controle = this.notaform.get(campo)

      controle?.markAsDirty();
    }
  }
}
