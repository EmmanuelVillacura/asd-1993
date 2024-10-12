import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http:HttpClient) { }



  async getGenero()
  {
      return await lastValueFrom(this.http.get<ApiResponse<any>>(environment.urlAPI + `nivelEducacional/obtenerGenero`,{}));
  }
}
