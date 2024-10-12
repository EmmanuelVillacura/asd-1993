import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private http:HttpClient) { }



  async agregarAlumno(body:bodyAgregar)
  {
    return await lastValueFrom(this.http.post<ApiResponse<any>>(environment.urlAPI + `matricula/agregar`,body));
  }



}



interface bodyAgregar{
  idAlumno:number;
  idCurso:number;
  idMedioPago:number;
  MontoPagado:number;
}