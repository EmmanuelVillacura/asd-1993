import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  correo:string = '';
  contrasena:string = '';

  constructor(private auth:LoginService, private router:Router,private fb: FormBuilder,private helper:HelperService){}


  ngOnInit(): void {

  }

  async login(){
    const loader = await this.helper.showLoader();
    try {
      let req = await this.auth.login(this.correo,this.contrasena);
      loader.dismiss();
      this.router.navigateByUrl('inicio');
    } catch (error:any) {
      this.helper.showError(error.msg,'Aceptar');
      loader.dismiss();
      
    }
  }



}
