import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private router:Router,public loginService:LoginService) { }


  title = 'AcademiasVD';
  isCollapsed = false;


  agregarMatricula(){
    console.log("agregar matricula");
    this.router.navigateByUrl('addMatricula');
    
  }

  editarMatricula(){
    console.log("editar matricula");
    this.router.navigateByUrl('editMatricula');
    
  }  
  eliminarMatricula(){
    console.log("eliminar matricula");
    this.router.navigateByUrl('deleteMatricula');
  }


  agregarCurso(){
    console.log("Agregar curso");
    this.router.navigateByUrl('addCurso');
  }


  buscarCurso(){
    console.log("editar curso");
    this.router.navigateByUrl('buscarCurso');
  }

  eliminarCurso(){
    console.log("elimianr curso");
    this.router.navigateByUrl('deleteCurso');
  }




  agregarProfesor(){
    console.log("agrega profesor");
    this.router.navigateByUrl('addProfe');
  }
  editarProfesor(){
    console.log("edita profesor");
    this.router.navigateByUrl('editProfe');
  }
  eliminarProfesor(){
    console.log("elimianr profesor");
    this.router.navigateByUrl('deleteProfe');
  }


  agregarAlumno(){
    this.router.navigateByUrl('addAlumno');
  }
  listasAlumno(){
    this.router.navigateByUrl('BuscarAlumno');
  }
  eliminarAlumno(){
    this.router.navigateByUrl('deleteAlumno');
  }






  pdf(){
    this.router.navigateByUrl("prueba");
  }


  isLoggedIn(): boolean {
    return this.loginService.isAuthenticated();
  }

  logOut(){
    console.log("Cerrando!!");
    
    this.loginService.logout();
  }

}
