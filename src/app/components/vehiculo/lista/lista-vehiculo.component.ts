import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { VehiculoModel } from 'src/app/models/vehiculo/vehiculo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css']
})
export class ListaVehiculoComponent implements OnInit {
  listado: VehiculoModel[] = [];
  showToast = false;
  constructor(private vehiculoServicio: VehiculoService, private router: Router,
  ) { }

  ngOnInit(): void {
    this.vehiculoServicio.obtenerTodos().subscribe(result => {
      this.listado = result;
    });
  }

  mostrarNuevoVehiculo() {
    this.router.navigate(['vehiculos/nuevo']);
  }

  mostrarEditar(item: VehiculoModel): void {
    this.router.navigate(['vehiculos/editar', item.id]);
  }

  eliminarVehiculo(item: VehiculoModel): void {
    const idVehiculo: any = item.id;
    this.showToast = true;
    this.vehiculoServicio.eliminar(idVehiculo).subscribe(result => {
      this.listado = this.listado.filter(x => x.id !== idVehiculo);
      setTimeout(()=>{
        this.showToast = false;
      }, 3000)
    });
  }
}
