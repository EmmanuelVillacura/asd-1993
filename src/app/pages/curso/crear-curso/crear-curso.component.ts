import { Component, OnInit } from '@angular/core';
import { Jornada, JornadaCurso } from 'src/app/models/jornada';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss']
})
export class CrearCursoComponent implements OnInit {

  nombreCurso:string="";
  jornada:JornadaCurso[]=[];
  jornadaSel:number=0;
  duracionCurso:number=0; 
  mesInicio:string = "";
  mesTermino:string = '';
  valorMatricula:number=0; 
  valorCertificacion:number=0; 
  valorMensualidad:number=0; 

  horaInicio:any;
  horaTermino:any;
  dia:any = "";

  date: Date | null = null;

  constructor(private cursoService:CursoService){}


  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.obtenerJornada();
  }


  log(value: string[]): void {
    console.log(value);
    this.dia = value.join(',');
    console.log("2222222222", this.dia);
  }


  convertirHora(fecha: any): string {
    const hora_recibida = new Date(fecha);
    const hora = hora_recibida.getHours().toString().padStart(2, '0');
    const minutos = hora_recibida.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
  }

  async crearCurso(){

    
     const req = await this.cursoService.agregarCursos(
      {
        certificacion:this.valorCertificacion,
        duracion:this.duracionCurso,
        jornadaId:this.jornadaSel,
        matricula:this.valorMatricula,
        mensualidad:this.valorMensualidad,
        mesInicio:this.mesInicio,
        mesTermino:this.mesTermino,
        nombreCurso:this.nombreCurso,
        dias:this.dia,
        horaInicio:this.convertirHora(this.horaInicio),
        horaTermino:this.convertirHora(this.horaTermino)
      });
      console.log("curso creado"); 
      
  }

  async obtenerJornada(){
    const req = await this.cursoService.GetJornada();
    this.jornada = req.data;
  }




  onChangeInicio(event: any) {
    if (event instanceof Date && !isNaN(event.getTime())) {
      const monthName = event.toLocaleString('default', { month: 'long' });
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      console.log(capitalizedMonth);
      this.mesInicio = capitalizedMonth;
    }
  }

  onChangeTermino(event: any) {
    if (event instanceof Date && !isNaN(event.getTime())) {
      const monthName = event.toLocaleString('default', { month: 'long' });
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      console.log(capitalizedMonth);
      this.mesTermino = capitalizedMonth;
    }
  }


}
