import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }


  async getRegion()
  {
      return await lastValueFrom(this.http.get<ApiResponse<any>>(environment.urlAPI + `location/obtenerRegion`,{}));
  }


  async getComunas(regionId:number,){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.urlAPI}location/obtenerComuna?regionId=${regionId}`));
  }


}
