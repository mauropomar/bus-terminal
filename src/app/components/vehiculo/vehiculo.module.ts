import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ListaVehiculoComponent } from './lista/lista-vehiculo.component';
import { FormVehiculoComponent } from './form/form-vehiculo.component';
import { DetalleVehiculoComponent } from './detalle/detalle-vehiculo.component';
import { ImagenArchivoComponent } from '../imagen-archivo/imagen-archivo.component';
import { DefaultImagePipe } from "./../../pipes/default-image.pipe";


@NgModule({
  declarations: [
    ListaVehiculoComponent,
    FormVehiculoComponent,
    DetalleVehiculoComponent,
    ImagenArchivoComponent,
    DefaultImagePipe
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
