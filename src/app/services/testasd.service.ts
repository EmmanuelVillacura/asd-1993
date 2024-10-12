import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TestasdService {

  constructor(private http:HttpClient) { }


  sendImagenPost(body:FormData):Observable<any>{
    return (this.http.post<ApiResponse<any>>(environment.urlAPI + 'pruebaimagen', body));
  }


}
