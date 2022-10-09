export interface VehiculoModel{
    id?:string;
    placa:string;
    capacidad: number;
    tipoUnidad:string;
    proveedor:string;
    foto?:string;
    fechaVencimientoSoat?:string;
    fechaVencimientoRevisionTecnica?:string;
    fechaRevisionTecnica?:string;
    fotoSoat?:string;
}