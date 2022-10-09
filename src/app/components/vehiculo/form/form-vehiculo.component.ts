import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,  Validators, FormControl } from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter, NgbCalendar,  NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CustomAdapter} from './../../../services/adaptadores/custom-adapter.service';
import {CustomDateParserFormatter} from './../../../services/adaptadores/custom-format.service';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class FormVehiculoComponent implements OnInit {
  formV:any;
  submitted = false;
  titulo = 'Crear un Vehiculo';

  minDate = { day: 9, month: 4, year: 2022 };
  model: NgbDateStruct;
  
  constructor(private formBuilder: FormBuilder, private readonly calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.formV = this.formBuilder.group({
      placa: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.email]],
      tipoUnidad: ['', Validators.required],
      foto: [''],
      proveedor: ['', Validators.required],
      fechaVencimientoSoap: ['', Validators.required],
      fechaVencimientoRevisionTecnica: ['', Validators.required],
      fechaRevisionTecnica: ['', Validators.required],
      fotoSoat: ['']
    });
  }

  onSubmit(){
    this.submitted = true;
 
    if (this.formV.invalid) {
        return;
    }

  }

}
