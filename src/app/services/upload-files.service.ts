import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http:HttpClient) { }

  async contratoMatriculaPDF(body:FormData){
    return await lastValueFrom(this.http.post<ApiResponse<any>>(environment.urlAPI + 'documentos/subir', body));
  }



}   
