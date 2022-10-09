import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ListaVehiculoComponent } from './lista/lista-vehiculo.component';
import { FormVehiculoComponent } from './form/form-vehiculo.component';
import { DetalleVehiculoComponent } from './detalle/detalle-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListaVehiculoComponent,
    FormVehiculoComponent,
    DetalleVehiculoComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule
  ]
})
export class VehiculoModule { }
