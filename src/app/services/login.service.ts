import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../model/ApiResponse';
import { environment } from 'src/environments/environment';

const USER_KEY:string = 'userAcademia';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User|null>;
  public currentUser: Observable<User|null>;
  isLoggedIn = false;

  constructor(private http: HttpClient,private router:Router) {

    const obj = localStorage.getItem(USER_KEY);
    if(obj){
      this.currentUserSubject = new BehaviorSubject<User|null>(JSON.parse(obj));
    }else{
      this.currentUserSubject = new BehaviorSubject<User|null>(null);
    }
    
    this.currentUser = this.currentUserSubject.asObservable();
  }



  public get currentUserValue() {
    return this.currentUserSubject.value;
  }



  async login(username: string, password: string) {
    const body = {
      correo:username,
      password:password
    }
    const req = await lastValueFrom(this.http.post<ApiResponse<User>>(`${environment.urlAPI}auth/token`,body));

/*     if(req.data[0].rolId != 5 && req.data[0].rolId != 2)
    {
      throw new Error("no_autorizado");
    } */

    localStorage.setItem(USER_KEY,JSON.stringify(req.data[0]));
    this.currentUserSubject.next(req.data[0]);
    this.isLoggedIn = true;
    return req.data[0];
    
  }

  logout() {
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null);
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }


  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
