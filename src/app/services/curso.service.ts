import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';
import { Jornada, JornadaCurso } from '../models/jornada';
import { Curso, cursoEditar, PreciosCurso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http :HttpClient) { }

  async getCurso()
  {
      return await lastValueFrom(this.http.get<ApiResponse<any>>(environment.urlAPI + `curso/obtener`,{}));
  }


  async getCursoPorJornada(jordanaId:number,cursoId:number){
    return await lastValueFrom(this.http.get<ApiResponse<Jornada>>(`${environment.urlAPI}curso/cursoPorJornada?jornada_id=${jordanaId}&cursoId=${cursoId}`));
  }


  async getCursoPrecios(cursoId:number){
    return await lastValueFrom(this.http.get<ApiResponse<PreciosCurso>>(`${environment.urlAPI}curso/cursoPrecio?cursoId=${cursoId}`));
  }


  async GetJornada()
  {
      return await lastValueFrom(this.http.get<ApiResponse<JornadaCurso>>(environment.urlAPI + `curso/jornada`,{}));
  }



  async agregarCursos(body:bodyCurso)
  {
    return await lastValueFrom(this.http.post<ApiResponse<any>>(environment.urlAPI + `curso/agregarCurso`,body));
  }



  async getCursoPorId(cursoId:number){
    return await lastValueFrom(this.http.get<ApiResponse<cursoEditar>>(`${environment.urlAPI}curso/cursoPorId?cursoId=${cursoId}`));
  }



  async editarCurso(body:bodyCursoEditar)
  {
    return await lastValueFrom(this.http.post<ApiResponse<any>>(environment.urlAPI + `curso/editarCurso`,body));
  }

}


interface bodyCurso{
  nombreCurso:string;
  jornadaId:number;
  duracion:number;
  mesInicio:string;
  mesTermino:string;
  matricula:number;
  certificacion:number;
  mensualidad:number;
  dias:string;
  horaInicio:string;
  horaTermino:string;
}

interface bodyCursoEditar{
  nombreCurso:string;
  jornadaId:number;
  duracion:number;
  mesInicio:string;
  mesTermino:string;
  matricula:number;
  certificacion:number;
  mensualidad:number;
  dias:string;
  horaInicio:string;
  horaTermino:string;
  cursoId:number;
}