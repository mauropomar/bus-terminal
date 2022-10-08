import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { VehiculoModel } from 'src/app/models/vehiculo/vehiculo.model';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css']
})
export class ListaVehiculoComponent implements OnInit {
  listado:VehiculoModel[] = [];
  constructor(private vehiculoServicio: VehiculoService) { }

  ngOnInit(): void {
    this.vehiculoServicio.getJSON().subscribe(result => {
      this.listado = result.data;
  });
  }

}
