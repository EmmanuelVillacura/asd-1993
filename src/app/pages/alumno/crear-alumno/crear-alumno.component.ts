import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { Comuna, Region } from 'src/app/models/location';
import { NivelEducacional } from 'src/app/models/nivelEducacional';
import { AlumnoService } from 'src/app/services/alumno.service';
import { GeneroService } from 'src/app/services/genero.service';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { NivelEducacionalService } from 'src/app/services/nivel-educacional.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.scss']
})


export class CrearAlumnoComponent  implements OnInit{

  nombre:string = '';
  rut:string = '';
  aPaterno:string = '';
  aMaterno:string = '';
  telefono:number = 0;
  direccion:string = '';
  correo:string = '';
  generoSel:number = 0;
  fechaNacimiento:string = '';
  nivelEducacionalSel:number = 0;


  generos:Genero[]=[];
  nivelesEducacionales:NivelEducacional[]=[];


  regiones:Region[]=[];
  comunas:Comuna[]=[];


  regionsel:number = 0;
  comunaSel:number = 0;

  constructor(private alumnoService:AlumnoService,
              private generoService:GeneroService,
              private nivelEducacionalService:NivelEducacionalService,
              public helper:HelperService,
              private locationService:LocationService
    ){}


  ngOnInit(): void {
    this.cargaInformacion();
  }



  date(event:any){

  }




  async cargaInformacion(){
    await this.obtenerGenero();
    await this.obtenerNivelEducacional();
    await this.obtenerRegion();
  }


  async obtenerRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async obtenerComuna(){
    const req = await this.locationService.getComunas(this.regionsel);
    this.comunas = req.data;
  }

  async obtenerGenero(){
    const req = await this.generoService.getGenero();
    this.generos = req.data;
  }

  async obtenerNivelEducacional(){
    const req = await this.nivelEducacionalService.getNivelEducacional();
    this.nivelesEducacionales = req.data;
  }

  async agregarAlumno(){
    try {
      const req = await this.alumnoService.agregarAlumno(
        {
          nombres: this.nombre,
          rut:this.rut,
          apellidoPaterno:this.aPaterno,
          apellidoMaterno:this.aMaterno,
          telefono:this.telefono,
          direccion:this.direccion,
          correo:this.correo,
          generoId:this.generoSel,
          fechaNacimiento:this.fechaNacimiento,
          nivelEducacional:this.nivelEducacionalSel,
          comunaId:this.comunaSel
        }
      );
    } catch (error:any) {
      alert(error.msg);
    }
  }


}
