import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensualidadService {

  constructor(private http:HttpClient) { }

  

  async obtenerMensualidadesPorCurso(cursoId:number,){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.urlAPI}mensualidad?cursoId=${cursoId}`));
  }




}
