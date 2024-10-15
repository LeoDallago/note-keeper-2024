import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemDashboard } from './models/item-dashboard-model';
import { NgClass, NgFor } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDivider } from '@angular/material/divider';
import { MatOption, MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { mIpsum } from 'mipsum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgClass,
    MatFormField,
    MatInput,
    MatLabel,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatDivider,
    MatSelect,
    MatOption,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public mipsum = mIpsum({
    pNum: 1,
    resultType: 'text',
  })

  itens: ItemDashboard[] = [
    {
      titulo: 'Categorias',
      descricao: this.mipsum.toString(),
      rota: '/categorias'
    },
    {
      titulo: 'Notas',
      descricao: this.mipsum.toString(),
      rota: '/notas'
    },
    {
      titulo: 'Notas Arquivadas',
      descricao: this.mipsum.toString(),
      rota: '/arquivadas'
    }
  ]
}
