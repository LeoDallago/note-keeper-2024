import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Menu } from './models/menu.models';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    NgForOf,
    RouterLink
  ]
})
export class ShellComponent {

  public itensMenu: Menu[] = [
    {
      titulo: 'Dashboard',
      icone: 'home',
      rota: '/dashboard'
    },
    {
      titulo: 'Categorias',
      icone: 'bookmarks',
      rota: '/categorias'
    },
    {
      titulo: 'Notas',
      icone: 'collections_bookmark',
      rota: '/notas'
    },
    {
      titulo: 'Arquivadas',
      icone: 'inventory_2',
      rota: '/arquivadas'
    }
  ]


  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
