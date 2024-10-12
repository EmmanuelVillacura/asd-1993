import { Injectable } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDF } from '../models/PDF';
import { UploadFilesService } from './upload-files.service';
import { MensualidadService } from './mensualidad.service';
import { Mensualidad } from '../models/mensualidad';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PDFService {

  imagenTitulo:any;
  imagenFirma:any;

  fechaActual: Date = new Date();
  dia:number = this.fechaActual.getDate();
  mes:number = this.fechaActual.getMonth();
  annio:number = this.fechaActual.getFullYear();
  mensualidades:Mensualidad[]=[];
  totalMensualidad:number = 0;


  imagenes: string[] = [];

  usuarioId:number = 0;
  nombreCompletoAlumno:string = "";
  nombreCurso:string = "";




  constructor(private uploadFiles:UploadFilesService) { }


  obtenerNombreDia(fecha: Date): string {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const numeroDia = fecha.getDay();
    return diasSemana[numeroDia];
  }

  obtenerNombreMes(fecha: Date): string {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const numeroMes = fecha.getMonth();
    return meses[numeroMes];
  }


  obtenerFechaVencimiento(indice: number): string {
    const fechaBase = new Date(2024, 2, 5);
    fechaBase.setMonth(fechaBase.getMonth() + indice);
    return fechaBase.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  }


  formatoCLP(valor: number): string {
    return `$${valor.toLocaleString('es-CL')}`;
  }




  convertirDatosTabla(mensualidades: Mensualidad[]): any[][] {    
    const tabla = [['CUOTA', 'DOCTO.', 'VALOR', 'VENCIMIENTO']];

    mensualidades.forEach((mensualidad, index) => {
     const cuota = (index + 1).toString().padStart(2, '0');
      const valor = this.formatoCLP(mensualidad.mensualidad);
      const vencimiento = this.obtenerFechaVencimiento(index + 1);
      tabla.push([cuota, 'pagare', valor, vencimiento]);
      this.totalMensualidad += mensualidad.mensualidad;      
    });

    return tabla;
  }



  generateFirma(){
        //Imagen firma
    const imgFirma = new Image();
    imgFirma.src = ('assets/img/firma.jpg');
    imgFirma.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgFirma.width;
      canvas.height = imgFirma.height;
      if (ctx) {
        ctx.drawImage(imgFirma, 0, 0);
      }
      const imageData = canvas.toDataURL('image/jpeg');
      this.imagenTitulo = imageData;

    }
  }

  loadImage(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.drawImage(img, 0, 0);
            }
            const imageData = canvas.toDataURL('image/jpeg');
            // Agregar la imagen al array imagenes
            this.imagenes.push(imageData);
            resolve(); // Resuelve la promesa una vez que la imagen se haya cargado correctamente
        };
        img.onerror = (error) => {
            reject(error); // Rechaza la promesa en caso de error al cargar la imagen
        };
    });
}

  
  generatePDF(body:PDF) {  
    

    this.usuarioId =  body.alumno[0].idUsuario;
    this. nombreCompletoAlumno = body.alumno[0].nombresUsuario + ' ' + body.alumno[0].apellidoPaternoUsuario + ' ' + body.alumno[0].apellidoMaternoUsuario
    this.nombreCurso = body.cursoFiltradoJornada[0].nombreCurso;
    const loadImagePromise1 = this.loadImage('assets/img/vd.jpg');
    const loadImagePromise2 = this.loadImage('assets/img/firma.jpg');

    Promise.all([loadImagePromise1, loadImagePromise2]).then(() => {
      this.totalMensualidad = this.totalMensualidad + body.preciosCurso[0].matricula;
      const diasConcatenados = body.cursoFiltradoJornada.map(dia => dia.dia).join(', ').replace(/,(?!.*,)/gmi, ' y');
      const fechaEspecifica = new Date("2024-04-27");
      const datosTabla = this.convertirDatosTabla(body.mensualidades);


    //Imagen cabecera
    const img = new Image();
    img.src = 'assets/img/vd.jpg'; // Ruta a tu imagen
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      const imageData = canvas.toDataURL('image/jpeg');
      this.imagenTitulo = imageData;
  
      const content: TDocumentDefinitions = {
        content: [
          /* PAGINA 1 */
          {
            image: this.imagenes[0],
            width: 100,
            height: 100,
          },
          {
            text: 'ACADEMIA ESTILISTA VD' + '\n\n',style:'header',
          },
          {
            text: 'Contrato de Servicios Educacionales' + '\n\n',style:'header2',
          },
              //pageBreak: 'after'
          {
            text: [
              'En Curicó, ',  this.obtenerNombreDia(fechaEspecifica) + ' ' + this.dia + ' de ' + this.obtenerNombreMes(fechaEspecifica) + ' del ' + this.annio,
              ', entre Academia VD SPA representada para estos efectos doña María Isabel Villacura con domicilio en Villota #430 de la comuna Curicó, por una parte, en adelante la Academia; y el contratante, (doña)don ',
              

              
                { text: body.nombreCompleto, style: 'negrita' },

                ', RUT ',  {text: body.rutCliente, style: 'negrita'}, ',',
                ' edad ', {text: body.edadCliente, style: 'negrita'} ,' años, ',
                ' domiciliado(a)en ', {text: body.domicilioCliente, style: 'negrita'} , ',',
                ' Comuna ', {text: body.comunaCliente, style: 'negrita'} ,',',
                ' teléfono ', {text: body.telefonoCliente, style: 'negrita'}, ',',
                ' han convenido el siguiente contrato de prestación de Servicios educacionales.' + '\n\n\n',

                {text:'PRIMERO: ', style: 'negrita'},
                'La Academia acepta e inscribe como alumno(a) contratante a ',
                {text: body.nombreCompleto , style:'negrita'},
                ', en adelante El Estudiante, para el periodo académico del año ',{text:this.annio.toString()}, ' a solicitud del contratante en el programa básico. ' + '\n\n',

                {text:'SEGUNDO: ',style:'negrita'},
                'Los cursos y actividades que impartirá, durante el periodo académico señalado en la cláusula precedente serán los que correspondan al plan de estudio vigente del programa. El Estudiante deberá observar las normas académicas (reglamento interno) y administrativas para inscribir dichos cursos o actividades.'  + '\n\n', 

                {text:'TERCERO: ',style:'negrita'},
                'La Academia, atendida la dinámica propia del proceso educativo podrá en cualquier tiempo y de conformidad con lo dispuesto en sus reglamentos orgánicos, aprobar modificaciones o actualizar planes de estudio, las mallas curriculares y las normativas así también como cambio de educadores y reglamentos académicos. Estas normas regirán a partir de la fecha de su dictación, sin perjuicio de los derechos adquiridos en virtud de las disposiciones vigentes al momento de celebrarse el contrato. Cualquier modificación sustancial a las condiciones académicas fijadas en los reglamentos internos vigentes a la fecha de suscripción del contrato requerirá del acuerdo de ambas partes.' + '\n\n',   



                {text:'CUARTO: ',style:'negrita'},
                'Los pagos de las cuotas se realizan en la academia en efectivo, teniendo como plazo máximo sin interés hasta el día 05 de cada mes, desde el 06 en adelante se cobra un interés diario (incluido fin de semana y feriados). ' + '\n\n', 
                'Además, los alumnos que retrasen su pago tienen como plazo para ingresar a clases hasta el día 20 de cada mes como máximo, luego de eso la academia se reserva el derecho de admisión y no podrán ingresar al aula. ' + '\n\n', 
                'La academia No está obligada a notificar en cada oportunidad las fechas de pago y se reserva el derecho de efectuar la cobranza en forma directa o a través de una entidad financiera, bancaria o de otro tipo. Para lo cual se realiza la siguiente autorización. '  + '\n\n',    

  
            ]
          ,alignment: 'justify',pageBreak: 'after'},
         /* PAGINA 1 */



          /* PAGINA 2 */
          {
            //PAGINA 2
            image: this.imagenes[0],
            width: 100,
            height: 100,
          },
          {
            
            text:'\n\n' + 'QUINTO: ' + 
            'Autorizo a Academias VD SPA RUT 77.026.583-5  para que en caso de simple retardo, mora o incumplimiento de las obligaciones contraídas en este documento y el pagare mis datos y los demás derivados de dichos documentos puedan ser ingresados, procesados, tratados y comunicados a terceros sin restricciones en el registro o banco de datos SICOM (Sistemas de morosidades y protestos DICOM).' + '\n\n'
            ,style:'negrita' ,alignment: 'justify'
  
          },
          {
            text:'Esta autorización es permanente pudiendo ser revocada sin efecto retroactivo y con fecha no anterior al último documento de pago emitido a mi nombre.' + '\n\n\n',
            alignment: 'justify'
          },

          {
            text:'Academias VD SPA' + '\n\n',style:'negrita'
          },
          {
            text:'IMPORTANTE' + '\n\n',style:'negrita'
          },
          {
            text:'MI HORARIO ESCOGIDO ES' + '\n\n',style:'negrita'
          },
          {
            text: [
              'Día: ', diasConcatenados, 
            ]
          },
          {
            text: [
              'Hora: ', body.cursoFiltradoJornada[0].horaInicio + ' - ' + body.cursoFiltradoJornada[0].horaTermino  , 
            ]
          },
          /*           {
            text: [
              'Inicio de clases: ', body.horarioInicioClases + '\n\n', 
            ]
          }, */

          {text:'Unordered list' + '\n\n', style: 'header'},
          {
            ul: [
              'UNA VEZ FIRMADO ELCONTRATO NO SE PUEDE ANULAR',
              'NO SE HACE DEVOLUCION DE DINERO',
              'SE RECIBEN SOLO PAGOS EN EFECTIVOS',
              'NO SE HACEN CAMBIOS DE HORARIOS',
              'LA PRIMERA MENSUALIDAD SE PAGA ANTES DE LA ENTRADA A CLASES: ' + this.formatoCLP(body.mensualidades[0].mensualidad),
            ],pageBreak: 'after'
          },

          /* PAGINA 2 */









          /* PAGINA 3 */
          {
            image: this.imagenes[0],
            width: 100,
            height: 100,

          },
          {
            text:'PAGARE' +  '\n\n',style:'negrita', 
          },
          {
            text: [
              { text: 'Deudor: ', style: 'negrita' },
              body.nombreCompleto
            ],
          } ,

          {
            text: [
              { text: 'Rut: ', style: 'negrita' },
              body.rutCliente
            ],
          } ,

          {
            text: [
              { text: 'Monto: ', style: 'negrita' },
              this.formatoCLP(this.totalMensualidad)
            ],
          } ,
          {
            text: [
              { text: '\n\n' + 'Debo y pagare a plazo y la orden de Academias VD. Rut 77.026.583-5 con domicilio en Villota 430, comuna de Curicó, o a quien sus derechos representen, la cantidad de $ ', style: '' },
              body.montoCLiente + 'más los intereses pactados ' +  this.formatoCLP(body.montoCLiente) + ' pesos por día de atrasos). ' +'\n\n' ,
              'La suma anterior la pagare de la siguiente forma y dentro de los plazos establecidos, en el domicilio del beneficiario de ' + body.montoCLiente + 'comuna de Curicó,  de la ciudad de Curicó.'
            ],
          } ,

          {
            text:[
              '\n\n'  + 'CAPITAL: ' + body.montoCLiente +  '\n\n' 
            ]
          },



          {
            text:[
              'Se pagará mediante ' + body.mensualidades[0].cantidadMensualidad +' cuotas de $' + this.formatoCLP(body.mensualidades[0].mensualidad) + ' cada una, todas con vencimiento los días 05 de cada mes, desde el mes de '+ body.cursoFiltradoJornada[0].mesInicio + ' del ' +  this.annio + ' hasta el mes de '+ body.cursoFiltradoJornada[0].mesTermino  +' del ' + this.annio + '.'
            ]
          },

          {
            text: '\n'  + 'En caso de mora o simple retardo en el pago de la cuota, la deuda se hará exigible en su totalidad considerándose de plazo vencido.'
          },

          {
            text: '\n'  + 'En caso de mora o simple retardo en el pago, el suscriptor se obliga a pagar el interés máximo convencional para operaciones de dinero reajustables, el que se aplicara desde la fecha de su presentación a cobro hasta el pago efectivo y total de lo adeudado.'
          },

          {
            text: '\n'  + 'Todas las obligaciones emanadas de este pagaren serán solidarias para el o los suscriptores, codeudores, fiadores y demás obligados al pago y serán indivisibles para sus herederos o sucesores para todos los efectos legales y, en especial para aquellos contemplados en los artículos 1526 N°4 y 1528 del código civil, pudiéndose exigirse su cumplimiento total a cada uno de los herederos del deudor o cada uno de los sucesores legales a cualquier título del suscriptor.'
          },
          {
            text: '\n'  + 'El portador queda liberado de la obligación de protestar este pagare respecto de todos los obligados a su pago.'
          },
          {
            text:[
              'Para todos los efectos legales, judiciales y de protesto derivados del presente pagare, el deudor o suscriptor constituye domicilio en ' + body.domicilioCliente +  '\n\n' 
            ]            
          },

          {
            text:'Curicó: ' + this.obtenerNombreDia(fechaEspecifica) + ' ' + this.dia + ' de ' + this.obtenerNombreMes(fechaEspecifica) + ' del ' + this.annio + '.',
          },
          {
            text:'Deudor: ' + body.nombreCompleto
          },
          {
            text:'Rut: ' + body.rutCliente
          },
          {
            text:'Domicilio: ' + body.domicilioCliente
          },
          {
            text:'Teléfono: ' + body.telefonoCliente
          },
          {
            text:'\n\n'  + 'Firma Deudor' + '________________________',
            pageBreak: 'after'
          },
          /* PAGINA 3 */










          /* PAGINA 4 */
          {
            image: this.imagenes[0],
            width: 100,
            height: 100,
          },
          {
            text:'Materiales que serán entregados dependiendo el plan de pago que el alumno haya elegido el primer día de clases o por su defecto por partes. ' + '\n\n'
          },
          {
            text:'Valor de la matricula '+ this.formatoCLP(body.preciosCurso[0].matricula) + '\n\n'
          },
          {
            text:'El valor del arancel suma un total de: ' + this.formatoCLP(body.mensualidades[0].mensualidad) + ' que se podrá pagar en ' + body.mensualidades[0].cantidadMensualidad +' cuotas mensuales cuyos valores se indican en la cláusula quinta.' + '\n\n'
          },
          {
            text:'Se debe dejar constancia que el presente contrato no contempla el valor del proceso de exámenes finales, titulación y graduación, que asciende a $ 90.000 monto que deberá ser cancelado el día 1 de marzo de 2024.' + '\n\n'
          },
          {
            style: 'tableExample',
            table: {
              body: datosTabla/* [
                ['CUOTA', 'DOCTO.','VALOR', 'VENCIMIENTO' ],
                ['01', 'pagare','$90.000','05 de marzo'],
                ['02', 'pagare','$90.000','05 de abril'],
                ['03', 'pagare','$90.000','05 de mayo'],
                ['04', 'pagare','$90.000','05 de junio'],
                ['05', 'pagare','$90.000','05 de julio'],
                ['06', 'pagare','$90.000','05 de agosto'],
                ['07', 'pagare','$90.000','05 de septiembre'],
                ['08', 'pagare','$90.000','05 de octubre'],
                ['09', 'pagare','$90.000','05 de noviembre'],
                ['10', 'pagare','$90.000','05 de diciembre'],
              ] */
            }
          },

          
         {
          text: '\n\n\n' + 'CERTIFICACION                   ' + this.formatoCLP(body.preciosCurso[0].certificacion) + '   _______________________',pageBreak: 'after'
         },
            //this.montoCLiente,
          

          /* PAGINA 4 */

          //            



          /* PAGINA 5 */
          {
            image: this.imagenes[0],
            width: 100,
            height: 100,

          },


          {
            text: [
              { text: 'SEXTO: ', style: 'negrita' },
              'Sin  perjuicio de las causas legales de terminación del contrato y la situación regulada en la cláusula décima, el contratante asume la obligación de pagar la totalidad de la suma acordada para el caso que el estudiante se desvincule de la Academia por cualquier causa, tales como  retiro, Anulación, suspensión voluntaria, etc. no procediendo a su respectiva devolución, ni imputación de la deuda ni compensación alguna, en atención a los compromisos académicos y económicos adquiridos por la academia para la adecuada prestación de los servicios educacionales contratados. Igual obligación pesara sobre el contratante en caso de que la estudiante fuera sancionada con la suspensión o expulsión por haber incurrido en falta grave en contra de los principios de convivencia estudiantil de conformidad con el reglamento respectivo por incumplimiento de los deberes estipulados en el reglamento del estudiante.' + '\n\n'
            ],
          } ,
          {
            text:'Tampoco se alterará la obligación señalada en la cláusula quinta en caso de impedimento temporal de la academia para prestar servicios como consecuencia de acto, obra, hecho u omisión de terceros y en el evento de caso fortuito o de fuerza mayor.'  + '\n\n' 
          },

          {
            text:[
              {text:'SEPTIMO: ', style:'negrita'},
              'La mora o simple retardo del pago de una o más cuotas, facultara a María Isabel Villacura para exigir el pago de toda la deuda y sus intereses como si fuera de plazo vencido y durante la mora en el pago de cualquiera de las cuotas también devengara el interés máximo convencional para operaciones no reajustables que la ley permita estipular calculando sobre la o las cuotas impagas hasta la fecha de su pago efectivo.' + '\n\n' 
            ]
          },
          {
            text:'Por otra parte, los atrasos que tenga el estudiante con los pagos sean contabilizados al final del año cobrando los intereses pactados al valor del día, contabilizados por día de atraso.' + '\n\n' 
          },
          {
            text:[
              {text:'OCTAVO: ', style:'negrita'},
              'La academia puede utilizar como material publicitario ya sea en redes sociales, graficas etc. Todas las fotografías de los trabajos que se realizan para y dentro de ',{text:'V D', style:'negrita'}, ', tal como trabajos cotidianos de los procedimientos capilares como también exámenes, etc.' + '\n\n'
            ]
          },
          {
            text:[
              {text:'NOVENO: ', style:'negrita'},
              'La academia estará facultada, asimismo, para suspender total o parcialmente la prestación de servicios correspondientes de conformidad con el Reglamento respectivo, cuando el Contratante retarde el pago de una o varias cuotas del Arancel. Igual derecho tendrá la academia cuando el estudiante no restituya oportunamente los bienes o materiales que le hayan sido entregados en préstamo, como, por ejemplo, materiales, herramientas, utensilios, etc.' + '\n\n'
            ]
          },
          {
            text:[
              {text:'DECIMO: ', style:'negrita'},
              'Asimismo, el estudiante deberá adquirir obligatoriamente las herramientas y productos exigidos por el reglamento del estudiante sin ninguna obligación de marca.' + '\n\n'
            ]
          },
          {
            text:[
              {text:'DECIMO PRIMERO: ', style:'negrita'},
              'Las partes dejan constancia de que la Academia no será responsable por los perjuicios derivados de la pérdida o sustracción de efectos personales de propiedad del estudiante que se introduzcan o se mantengan en los recintos de la Academia. Por consiguiente, este reconoce su obligación de mantener el debido cuidado sobre dichos objetos.' + '\n\n'
            ],
            pageBreak: 'after'
          },


          /* PAGINA 5 */

                      



          /* PAGINA 6 */
          {
            image: this.imagenes[0],
            width: 100,
            height: 100,
          },
          /* PAGINA 6 */

          {
            text:[  {text:'DECIMO SEGUNDO: ', style:'negrita'},
              'El Contratante y el Estudiante declaran estar en pleno conocimiento de los reglamentos académicos y normas internas vigentes y los aceptan en todas sus partes. En tal sentido, las partes declaran haber cumplido la obligación contenida en el artículo 3° letra b) de la Ley N°19.496. El Contratante se ha informado responsablemente de las condiciones y obligaciones del presente contrato antes de la celebración de este, a través de los medios que la Academia ha dispuesto para tal efecto, entre otros, página web, folletos institucionales directivos, personal académico y monitores de admisión' + '\n\n'
            ]
          },

          {
            text:'Asimismo, autoriza expresamente a la Academia para que esta pueda, durante el periodo de vigencia de este Contrato, verificar y actualizar sus datos personales que haya entregado. La verificación y actualización se realizarán de conformidad a los dispuestos en la Ley N°19628 sobre Protección de Datos de carácter Personal.'  + '\n\n',
            style:'negrita'
          },

          {
            text:[
              {text:'DECIMO TERCERO: ', style:'negrita'},
              ': El Contratante Declara haber leído el presente Contrato y estar en completo acuerdo con él.' + '\n\n'
            ],
          },
          {
            text:[
              {text:'DECIMO CUARTO: ', style:'negrita'},
              'Las partes fijan como domicilio la ciudad de Curicó, para todos los efectos de este contrato y se someten a la competencia de sus Tribunales de Justicia.' + '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
            ],
          },

          {
            image: this.imagenes[1],
            width: 100,
            height: 100,
            absolutePosition: { x: 75, y: 560 }
          },
          { 
            text:'_____________________________' + '                                                       ' + '__________________________________' 
          },
          { 
            text:'María Isabel Villacura Vergara' + '                                                       ' + body.nombreCompleto + '\n\n\n\n\n\n'
          },

          {
            text:'He leído el Reglamento Interno de la Academia y declaro estar en acuerdo y aceptar todas las cláusulas  y condiciones.',style:'negrita'
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            //alignment: 'start'
          },
          header2: {
            fontSize: 14,
            bold: true,
            //alignment: 'start'
          },
          negrita:{
            fontSize: 14,
            bold: true,
          },
        }
      };
      
      const PDF = pdfMake.createPdf(content).getBlob((blob: Blob) => {
        this.subirPDF(blob);
      });
      pdfMake.createPdf(content).open();

    }
  });
  }




  async subirPDF(pdf:any){   
    const body = new FormData();
    body.append('nombre_archivo', this.nombreCurso);
    body.append('usuario_id',this.usuarioId.toString());
    body.append('nombre_usuario',this.nombreCompletoAlumno);
    body.append('archivo', pdf);
    body.append('extension_archivo','.pdf');
    //body.append('')
    this.uploadFiles.contratoMatriculaPDF(body);
  }
  
}
