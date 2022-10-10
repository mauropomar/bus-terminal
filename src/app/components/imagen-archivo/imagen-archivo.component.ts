import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imagen-archivo',
  templateUrl: './imagen-archivo.component.html',
  styleUrls: ['./imagen-archivo.component.css']
})
export class ImagenArchivoComponent implements OnInit {
  @Input() titulo = '';
  @Input() imagenUrl: any = '';
  @Input() idImagen = '';
  @Output() cargarImagen: EventEmitter<string> = new EventEmitter();
  file: any;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any): void {
    this.file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.imagenUrl = reader.result;
      this.cargarImagen.emit(this.imagenUrl);
    };
    reader.readAsDataURL(this.file);
  }



}
