import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {

  constructor(private http:HttpClient) { }


  async getMedioPago()
  {
      return await lastValueFrom(this.http.get<ApiResponse<any>>(environment.urlAPI + `nivelEducacional/obtenerMedioPago`,{}));
  }
}
