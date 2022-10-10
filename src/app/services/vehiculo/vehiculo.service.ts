import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class VehiculoService {

   constructor(private http: HttpClient) {

    }

    public getJSON(): Observable<any> {
        return this.http.get("./assets/data/vehiculos.json");
    }

    public agregar(): Observable<any>{
      return this.http.get("./assets/data/vehiculos.json");
    }
}
