import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso, cursoEditar } from 'src/app/models/curso';
import { JornadaCurso } from 'src/app/models/jornada';
import { CursoService } from 'src/app/services/curso.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.scss']
})
export class EditarCursoComponent implements OnInit{

  cursoId:number=0;
  curso:cursoEditar[]=[];







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


  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  diasSeleccionados: string[] = [];
  
  constructor(private activateRoute:ActivatedRoute,private cursoService:CursoService,private helper:HelperService){}
  ngOnInit(): void {
    this.cursoId = this.activateRoute.snapshot.params['cursoId'];
    this.load();    
  }

  async load(){
    await this.cargarCurso();
    await this.obtenerJornada();
  }




  async obtenerJornada(){
    const req = await this.cursoService.GetJornada();
    this.jornada = req.data;
  }

  async editarCurso(){

    console.log("000000000",this.diasSeleccionados);
    console.log("999999999999",this.dia);
    
    this.onChangeInicio(this.mesInicio);
    this.onChangeTermino(this.mesTermino);


    if (this.dia == "") {
      this.dia = this.curso[0].diasConcatenados;
    }
    const req = await this.cursoService.editarCurso(
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
        horaTermino:this.convertirHora(this.horaTermino),
        cursoId:this.cursoId
      });

      console.log("curso editado"); 
  }


  convertirHora(fecha: any): string {
    const hora_recibida = new Date(fecha);
    const hora = hora_recibida.getHours().toString().padStart(2, '0');
    const minutos = hora_recibida.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
  }


  async cargaInformacionCurso(){
    console.log("DIAS SELECCIONADOS",this.diasSeleccionados);
    
    this.nombreCurso = this.curso[0].nombreCurso;
    this.jornadaSel = this.curso[0].jornadaId;
    this.duracionCurso = this.curso[0].duracion;
    this.mesInicio = this.curso[0].mesInicio;
    this.mesTermino = this.curso[0].mesTermino;
    this.valorMatricula = this.curso[0].matricula;
    this.valorCertificacion = this.curso[0].certificacion;
    this.valorMensualidad = this.curso[0].mensualidad;


    const numeroMesInicio = this.meses.findIndex(mes => mes === this.curso[0].mesInicio);
    this.mesInicio = new Date(new Date().getFullYear(), numeroMesInicio, 1).toISOString();

    const numeroMesTermino = this.meses.findIndex(mes => mes === this.curso[0].mesTermino);
    this.mesTermino = new Date(new Date().getFullYear(), numeroMesTermino, 1).toISOString();

    const partesHora = this.curso[0].horaInicio.split(':');
    const horas = parseInt(partesHora[0], 10);
    const minutos = parseInt(partesHora[1], 10);
    this.horaInicio = new Date();
    this.horaInicio.setHours(horas);
    this.horaInicio.setMinutes(minutos);

    const partesHoraTermino = this.curso[0].horaTermino.split(':');
    const horasTermino = parseInt(partesHoraTermino[0], 10);
    const minutosTermino = parseInt(partesHoraTermino[1], 10);
    this.horaTermino = new Date();
    this.horaTermino.setHours(horasTermino);
    this.horaTermino.setMinutes(minutosTermino);
    this.diasSeleccionados = this.curso[0].diasConcatenados.split(',');


  }


  async cargarCurso(){
    const loader = await this.helper.showLoader();
    try {
      const req = await this.cursoService.getCursoPorId(this.cursoId);
      this.curso = req.data;
      await this.cargaInformacionCurso();
      loader.dismiss();
    } catch (error:any) {
      loader.dismiss();
      this.helper.showError(error.msg ,'Aceptar');
    }
  }


  log(value: string[]): void {
    console.log(value);
    this.dia = value.join(',');
    console.log("2222222222", this.dia);
  }







  onChangeInicio(event: any) {
    let dateToConvert: Date;

    if (event instanceof Date && !isNaN(event.getTime())) {
      // Si el evento es una instancia de Date y es válido, lo usamos directamente
      dateToConvert = event;
    } else if (typeof event === 'string' || event instanceof String) {
      // Si el evento es una cadena, intentamos crear una instancia de Date a partir de ella
      dateToConvert = new Date(event.toString()); // Conversión explícita a cadena
      // Verificamos si la fecha es válida
      if (isNaN(dateToConvert.getTime())) {
        console.error('Fecha inválida');
        return;
      }
    } else {
      console.error('Tipo de evento no válido');
      return;
    }
  
    const monthName = dateToConvert.toLocaleString('default', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    console.log("Nombre del mes--->", capitalizedMonth);
    this.mesInicio = capitalizedMonth;
  }

  onChangeTermino(event: any) {
    let dateToConvert: Date;

    if (event instanceof Date && !isNaN(event.getTime())) {
      // Si el evento es una instancia de Date y es válido, lo usamos directamente
      dateToConvert = event;
    } else if (typeof event === 'string' || event instanceof String) {
      // Si el evento es una cadena, intentamos crear una instancia de Date a partir de ella
      dateToConvert = new Date(event.toString()); // Conversión explícita a cadena
      // Verificamos si la fecha es válida
      if (isNaN(dateToConvert.getTime())) {
        console.error('Fecha inválida');
        return;
      }
    } else {
      console.error('Tipo de evento no válido');
      return;
    }
  
    const monthName = dateToConvert.toLocaleString('default', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    console.log("Nombre del mes--->", capitalizedMonth);
    this.mesTermino = capitalizedMonth;
  }

}
