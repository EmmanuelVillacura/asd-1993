import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Curso, PreciosCurso } from 'src/app/models/curso';
import { Jornada } from 'src/app/models/jornada';
import { Medio_pago } from 'src/app/models/medio_pago';
import { Mensualidad } from 'src/app/models/mensualidad';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import { HelperService } from 'src/app/services/helper.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { MedioPagoService } from 'src/app/services/medio-pago.service';
import { MensualidadService } from 'src/app/services/mensualidad.service';
import { PDFService } from 'src/app/services/pdf.service';
import { TestasdService } from 'src/app/services/testasd.service';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})


export class CrearComponent implements OnInit{

  urlImgUp:string = "https://localhost:5001/pruebaimagen";

  pago:number = 0;


  cursoSel:number = 0;
  medioPagoSel:number = 0;

  fileList2:any[]=[];
  isImageMobile:boolean = false;
  imagenAlumnoApp:any[]=[];



  busquedaAlumno:string = "";



  cursos:Curso[]=[];
  mediosPagos:Medio_pago[]=[];

  alumnoBuscado:Alumno[]=[];


  anoNacimientoAlumno:number = 0;
  fechaActual = new Date();

  mensualidades:Mensualidad[]=[];

  cursosJornada:Jornada[]=[];

  cursoPrecios:PreciosCurso[]=[];

  constructor(private serviceTest:TestasdService,
              private cursoService:CursoService,
              private medioPagoService:MedioPagoService,
              private alumnoService:AlumnoService,
              public helper:HelperService,
              private matriculaService:MatriculaService,
              private pdfService:PDFService,
              private mensualidadService:MensualidadService


    ) { }


  ngOnInit(): void {
    this.load();
  }
  

  async load(){
    this.obtenerCursos();
    this.obtenerMedioPago();
  }

  async cargaPreciosCurso(cursoId:number){    
    const req = await this.cursoService.getCursoPrecios(cursoId);
    this.cursoPrecios = req.data;
  }


  cambioJornada(){
    console.log("JORNADA",this.cursos.filter(e => e.idCurso == this.cursoSel)[0].idCurso);
    
    this.obtenerCursoPorJornada(this.cursoSel,this.cursos.filter(e => e.idCurso == this.cursoSel)[0].idJornada);
  }

  async obtenerCursoPorJornada(cursoId:number,jornadaId:number){
    const req = await this.cursoService.getCursoPorJornada(jornadaId,cursoId);
    this.cursosJornada = req.data;
  }


  async obtenerCursos(){
    const req = await this.cursoService.getCurso();
    this.cursos = req.data;
  }


  async obtenerMedioPago(){
    const req = await this.medioPagoService.getMedioPago();
    this.mediosPagos = req.data;
  }


  async buscarAlumno(){ 
  try {
    if (this.busquedaAlumno == '') {
      alert("Ingresar rut");
      return;
    }
    const req = await this.alumnoService.buscarALumnoMatricula(this.busquedaAlumno);
    this.alumnoBuscado = req.data;

    let anoAlumno: Date = new Date(this.alumnoBuscado[0].fechaNacimientoUsuario);
    this.anoNacimientoAlumno = anoAlumno.getFullYear();
  } catch (error:any) {   
    alert(error.error.msg);
  }
  }


  async agregarMatricula(){    
    await this.cargaMensualidad(this.cursoSel);
    await this.cargaPreciosCurso(this.cursoSel);
    const req = await this.matriculaService.agregarAlumno(
      {
        idAlumno:this.alumnoBuscado[0].idUsuario,
        idCurso:this.cursoSel,
        idMedioPago:this.medioPagoSel,
        MontoPagado:this.pago
      }
    );
    this.crearPDF();
  }

  async cargaMensualidad(cursoId:number){
    const req = await this.mensualidadService.obtenerMensualidadesPorCurso(cursoId);
    this.mensualidades = req.data;
  }



  filtrarCursoPorJornada(){
    const cursoFiltrado = this.cursos.filter(e => e.idCurso == this.cursoSel);
    return cursoFiltrado;
  }





  crearPDF(){
    //const cursoFiltrado = this.filtrarCursoPorJornada();
    const jornadaId = this.filtrarCursoPorJornada()[0].idJornada;
    const anioActual = this.fechaActual.getFullYear();
    let edad = anioActual - this.anoNacimientoAlumno;
    this.pdfService.generatePDF(
      {
        comunaCliente:this.alumnoBuscado[0].comunaname,
        domicilioCliente:this.alumnoBuscado[0].direccionUsuario,
        edadCliente:edad.toString(),
        horarioDia:'8:30',
        horarioHora:'8:30',
        horarioInicioClases:'8:30',
        montoCLiente:this.pago,
        nombreCompleto:this.alumnoBuscado[0].nombresUsuario + ' ' + this.alumnoBuscado[0].apellidoPaternoUsuario + ' '  + this.alumnoBuscado[0].apellidoMaternoUsuario,
        noseQueOnda:'xxxxx',
        primeraMensualidad:this.pago.toString(),
        rutCliente:this.alumnoBuscado[0].rutUsuario,
        telefonoCliente:this.alumnoBuscado[0].telefonoUsuario.toString(),
        cursoId:this.cursoSel,
        mensualidades:this.mensualidades,
        cursoFiltradoJornada:this.cursosJornada,
        preciosCurso:this.cursoPrecios,
        alumno:this.alumnoBuscado
        
      }
    );
  }



}
