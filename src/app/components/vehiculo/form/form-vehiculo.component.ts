import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './../../../services/adaptadores/custom-adapter.service';
import { CustomDateParserFormatter } from './../../../services/adaptadores/custom-format.service';
import { VehiculoModel } from 'src/app/models/vehiculo/vehiculo.model';
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
  model: NgbDateStruct;

  constructor(private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute,
    private router: Router) { }

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
    if(cerrar){
      this.router.navigate(['vehiculos']);
    }
  }

  cerrar(){
    this.router.navigate(['vehiculos']);
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
