import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculoModel } from 'src/app/models/vehiculo/vehiculo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) {

  }

  public obtenerTodos(): Observable<VehiculoModel[]> {
    return this.http.get<VehiculoModel[]>(`${environment.apiUrl}/vehiculos`);
  }

  public agregar(vehiculo: VehiculoModel): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(vehiculo);
    return this.http.post(`${environment.apiUrl}/vehiculos`, body, { 'headers': headers })
  }
}
