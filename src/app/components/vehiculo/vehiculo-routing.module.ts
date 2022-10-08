import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculoComponent } from './lista/lista-vehiculo.component';
import { FormVehiculoComponent } from './form/form-vehiculo.component';
import { DetalleVehiculoComponent } from './detalle/detalle-vehiculo.component';

const routes: Routes = [
  {
    path:'',
    component:ListaVehiculoComponent
  },{
    path:'lista',
    component:ListaVehiculoComponent
  },{
    path:'nuevo',
    component:FormVehiculoComponent
  },{
    path:'editar/:id',
    component:FormVehiculoComponent
  },{
    path:'detalle/:id',
    component:DetalleVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
