import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
export class FormVehiculoComponent implements OnInit {
  formV: any;
  titulo = 'Crear un vehículo';
  imagenUrlFoto = './../../../assets/images/no-image.png';
  imagenUrlFotoRevTec = './../../../assets/images/no-image.png';
  imagenUrlFotoSoat = './../../../assets/images/no-image.png';
  minDate = { day: 9, month: 4, year: 2022 };
  titleToast = 'Exitoso';
  bodyToast = '';
  showToast = false;
  model: NgbDateStruct;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
    private router: Router, private vehiculoService: VehiculoService) { }

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

  guardarCambios(cerrar: any) {
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
    this.vehiculoService.agregar(datosObj).subscribe(result => {
      if (result) {
        this.bodyToast = 'El vehículo fue creado satisfactoriamente.';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000)
        this.limpiarCampos();
        if (cerrar) {
          this.router.navigate(['vehiculos']);
        }
      }
    });

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
