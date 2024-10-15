import { Routes } from "@angular/router";
import { ListarArquivadasComponent } from "../listar/listar-arquivadas.component";


export const arquivadasRoutes: Routes = [
    {
        path: '', redirectTo: 'listar', pathMatch: 'full',
    },
    {
        path: 'listar', component: ListarArquivadasComponent
    }
]