import { Component } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { TestasdService } from 'src/app/services/testasd.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pruebapdf',
  templateUrl: './pruebapdf.component.html',
  styleUrls: ['./pruebapdf.component.scss']
})
export class PruebapdfComponent {



  imagenTitulo:any;

  fecha:string = "6 de Marzo del 2023";
  nombreCliente:string = "Guillermo Matías Villacura Torres";
  rutCliente:string = "18.402.429-2";
  edadCliente:string = "30";
  domicilioCliente:string = "Cordillera de la sal #2467";
  comunaCliente:string = "Puente Alto";
  telefonoCliente:string = "+56931701719";
  anio:string = "2024";
  primeraMensualidad:string = 'No se que va acá';
  montoCLiente:string = "$50.000";

  horarioDia:string = "Lunes 11 de marzo";
  horarioHora:string = "8:30";
  horarioInicioClases:string = "8:30";



  
  noseQueOnda:string="No se que va acá";









}
