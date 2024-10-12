import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) { }


  async agregarAlumno(body:bodyAgregar)
  {
    return await lastValueFrom(this.http.post<ApiResponse<any>>(environment.urlAPI + `alumno/agregar`,body));
  }


  async buscarALumnoMatricula(rut_alumno:string,){
    return await lastValueFrom(this.http.get<ApiResponse<Alumno>>(`${environment.urlAPI}alumno/buscar?rut_usuario=${rut_alumno}`));
  }



}


interface bodyAgregar{
  rut:string;
  nombres:string;
  apellidoPaterno:string;
  apellidoMaterno:string;
  telefono:number;
  direccion:string;
  correo:string;
  fechaNacimiento:string;
  generoId:number;
  nivelEducacional:number;
  comunaId:number;
}