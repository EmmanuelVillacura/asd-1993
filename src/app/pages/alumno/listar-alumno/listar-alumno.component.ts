import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-listar-alumno',
  templateUrl: './listar-alumno.component.html',
  styleUrls: ['./listar-alumno.component.scss']
})
export class ListarAlumnoComponent {

  rut:string = '';
  alumno:Alumno[]=[];
  
  constructor(private alumnosService:AlumnoService,public helper:HelperService){}




  async buscarAlumnosPorRut(){
    const req = await this.alumnosService.buscarALumnoMatricula(this.rut);
    this.alumno = req.data;
  }





}
