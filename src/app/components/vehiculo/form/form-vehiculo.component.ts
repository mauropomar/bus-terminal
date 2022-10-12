import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './../../../services/adaptadores/custom-adapter.service';
import { CustomDateParserFormatter } from './../../../services/adaptadores/custom-format.service';
import { VehiculoModel } from 'src/app/models/vehiculo/vehiculo.model';
import { VehiculoService } from 'src/app/services/vehiculo/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class FormVehiculoComponent implements OnInit, AfterViewInit {
  formV: any;
  titulo = 'Crear un vehículo';
  imagenUrlFoto = './../../../assets/images/no-image.png';
  imagenUrlFotoRevTec = './../../../assets/images/no-image.png';
  imagenUrlFotoSoat = './../../../assets/images/no-image.png';
  minDate = { day: 9, month: 4, year: 2022 };
  titleToast = 'Exitoso';
  bodyToast = '';
  showToast = false;
  idVehiculo = '';
  model: NgbDateStruct;

  constructor(private formBuilder: FormBuilder, private activateRoute: ActivatedRoute,
    private router: Router, private vehiculoService: VehiculoService) {
    this.activateRoute.params.subscribe((params: any) => {
      this.idVehiculo = params.id ? params.id : '';
    });
  }

  ngOnInit(): void {
    this.formV = this.formBuilder.group({
      placa: ['', Validators.required],
      capacidad: ['', [Validators.required]],
      tipoUnidad: ['', Validators.required],
      proveedor: ['', Validators.required],
      fechaVencimientoSoat: ['', Validators.required],
      fechaVencimientoRevisionTecnica: ['', Validators.required],
      foto: [''],
      fotoRevisionTecnica: [''],
      fotoSoat: ['']
    });
  }

  ngAfterViewInit(): void {
    if (this.idVehiculo !== '') {
      this.obtener(this.idVehiculo);
    }
  }

  obtener(idVehiculo: string) {
    this.titulo = 'Editar vehículo';
    this.vehiculoService.obtenerTodos().subscribe(
      resultado => this.cargarInformacion(idVehiculo, resultado)
    );
  }

  cargarInformacion(idVehiculo: string, elementos: VehiculoModel[]): void {
    let elemento: any = elementos.find(x => x.id === idVehiculo);
    this.formV.controls.placa.setValue(elemento.placa);
    this.formV.controls.capacidad.setValue(elemento.capacidad);
    this.formV.controls.tipoUnidad.setValue(elemento.tipoUnidad);
    this.formV.controls.proveedor.setValue(elemento.proveedor);
    const fechaVencSoat = this.formatearFecha(elemento.fechaVencimientoSoat);
    const fechaVencRevTec = this.formatearFecha(elemento.fechaVencimientoRevisionTecnica);
    this.formV.controls.fechaVencimientoRevisionTecnica.setValue(fechaVencRevTec);
    this.formV.controls.fechaVencimientoSoat.setValue(fechaVencSoat);
    this.imagenUrlFoto = elemento.foto ?elemento.foto: './../../../assets/images/no-image.png';
    this.imagenUrlFotoSoat = elemento.fotoSoat? elemento.fotoSoat: './../../../assets/images/no-image.png';
    this.imagenUrlFotoRevTec = elemento.fotoRevisionTecnica? elemento.fotoRevisionTecnica: './../../../assets/images/no-image.png';;
  }

  guardarCambios(cerrar: boolean) {
    if (this.formV.invalid) {
      return;
    }
    const datosObj: VehiculoModel = {
      placa: this.formV.controls.placa.value,
      capacidad: this.formV.controls.capacidad.value,
      tipoUnidad: this.formV.controls.tipoUnidad.value,
      proveedor: this.formV.controls.proveedor.value,
      fechaVencimientoSoat: this.formV.controls.fechaVencimientoSoat.value,
      fechaVencimientoRevisionTecnica: this.formV.controls.fechaVencimientoRevisionTecnica.value,
      foto: this.imagenUrlFoto,
      fotoRevisionTecnica: this.imagenUrlFotoRevTec,
      fotoSoat: this.imagenUrlFotoSoat
    }
    if (this.idVehiculo === '') {
      this.agregarVehiculo(datosObj, cerrar);
    } else {
      this.actualizarVehiculo(this.idVehiculo, datosObj);
    }
  }

  agregarVehiculo(datos: VehiculoModel, cerrar: boolean) {
    this.vehiculoService.agregar(datos).subscribe((resultado) => {
      if (resultado) {
        this.bodyToast = 'Los cambios fueron realizados satisfactoriamente.';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
          this.limpiarCampos();
          if (cerrar) {
            this.router.navigate(['vehiculos']);
          }
        }, 3000)

      }
    })
  }

  actualizarVehiculo(idVehiculo: string, datos: VehiculoModel) {
    this.vehiculoService.actualizar(idVehiculo, datos).subscribe((resultado) => {
      if (resultado) {
        this.bodyToast = 'Los cambios fueron realizados satisfactoriamente.';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['vehiculos']);
        }, 3000)
      }
    })
  }

  cerrar() {
    this.router.navigate(['vehiculos']);
  }

  limpiarCampos() {
    this.formV.controls.placa.setValue('');
    this.formV.controls.capacidad.setValue('');
    this.formV.controls.tipoUnidad.setValue('');
    this.formV.controls.proveedor.setValue('');
    this.formV.controls.fechaVencimientoSoat.setValue('');
    this.formV.controls.fechaVencimientoRevisionTecnica.setValue('');
    this.imagenUrlFoto = './../../../assets/images/no-image.png';
    this.imagenUrlFotoRevTec = './../../../assets/images/no-image.png';
    this.imagenUrlFotoSoat = './../../../assets/images/no-image.png';
  }

  formatearFecha(fecha: string): string {
    const fechaCadena = fecha.split('-');
    return `${fechaCadena[0]}-${fechaCadena[1]}-${fechaCadena[2]}`
  }

  cargarImagenFotoVehiculo(event: string) {
    this.imagenUrlFoto = event;
  }

  cargarImagenFotoRevisionTecnica(event: string) {
    this.imagenUrlFotoRevTec = event;
  }

  cargarImagenFotoSoat(event: string) {
    this.imagenUrlFotoSoat = event;
  }
}
