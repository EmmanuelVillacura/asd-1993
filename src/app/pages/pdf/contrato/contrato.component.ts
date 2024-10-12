import { Component, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TestasdService } from 'src/app/services/testasd.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit{


  titulo1:string = "ACADEMIA ESTILISTA VD";
  titulo2:string = "Contrato de Servicios Educacionales";
  imagenTitulo:any;

  textoUno:string = "En Curicó";
  fecha:string = "6 de Marzo del 2023";


  nombreCliente:string = "Guillermo Matías Villacura Torres";
  rutCliente:string = "18.402.429-2";
  edadCliente:string = "30";
  domicilioCliente:string = "Cordillera de la sal #2467";
  comunaCliente:string = "Puente Alto";
  telefonoCliente:string = "+56931701719";
  anio:string = "2024";


  horarioDia:string = "Lunes 11 de marzo";
  horarioHora:string = "8:30";
  horarioInicioClases:string = "8:30";


  mensualidadAntesEntradaClases:string = "$90.000";




  name:string = " Guillermo Matías Villacura Torres ";
  txt:string = " imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas , las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.";
  txt2:string = "Lorem Ipsum es ";
  txt3:string = "Lorem Ipsum es simplemente el ";

  constructor(private serviceTest:TestasdService ) { }

  ngOnInit(): void {

  }



  openPdf() {
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
  
      const ctm: any = {
        content: [
          {
            image: this.imagenTitulo,
            width: 100,
            height: 100 // Agregar la imagen aquí
          },
          {
            text: this.titulo1 + '\n\n', style: 'header'
          },
          {
            text: this.titulo2 + '\n\n', style: 'header2'
          },
          {
            text: [
              'En Curicó ', this.fecha , 
              ' entre Academia VD SPA representada para estos efectos doña María Isabel Villacura con domicilio en Villota 430 de la comuna Curicó, por una parte, en adelante la Academia; y el contratante, (doña)don ',
              

              
                { text: this.nombreCliente, style: 'negrita' },

                ', RUT ',  {text: this.rutCliente, style: 'negrita'}, ',',
                ' edad ', {text: this.edadCliente, style: 'negrita'} ,' años, ',
                ' domiciliado(a)en ', {text: this.domicilioCliente, style: 'negrita'} , ',',
                ' Comuna ', {text: this.comunaCliente, style: 'negrita'} ,',',
                ' teléfono ', {text: this.telefonoCliente, style: 'negrita'}, ',',
                ' han convenido el siguiente contrato de prestación de Servicios educacionales.' + '\n\n\n',

                {text:'PRIMERO: ', style: 'negrita'},
                'La Academia acepta e inscribe como alumno(a) contratante a ',
                {text: this.nombreCliente , style:'negrita'},
                ', en adelante El Estudiante, para el periodo académico del año ',{text:this.anio}, ' a solicitud del contratante en el programa básico. ' + '\n\n',

                {text:'SEGUNDO: ',style:'negrita'},
                'Los cursos y actividades que impartirá, durante el periodo académico señalado en la cláusula precedente serán los que correspondan al plan de estudio vigente del programa. El Estudiante deberá observar las normas académicas (reglamento interno) y administrativas para inscribir dichos cursos o actividades.'  + '\n\n', 

                {text:'TERCERO: ',style:'negrita'},
                'La Academia, atendida la dinámica propia del proceso educativo podrá en cualquier tiempo y de conformidad con lo dispuesto en sus reglamentos orgánicos, aprobar modificaciones o actualizar planes de estudio, las mallas curriculares y las normativas así también como cambio de educadores y reglamentos académicos. Estas normas regirán a partir de la fecha de su dictación, sin perjuicio de los derechos adquiridos en virtud de las disposiciones vigentes al momento de celebrarse el contrato. Cualquier modificación sustancial a las condiciones académicas fijadas en los reglamentos internos vigentes a la fecha de suscripción del contrato requerirá del acuerdo de ambas partes.' + '\n\n',   



                {text:'CUARTO: ',style:'negrita'},
                'Los pagos de las cuotas se realizan en la academia en efectivo, teniendo como plazo máximo sin interés hasta el día 05 de cada mes, desde el 06 en adelante se cobra un interés diario (incluido fin de semana y feriados). ' + '\n\n', 
                'Además, los alumnos que retrasen su pago tienen como plazo para ingresar a clases hasta el día 20 de cada mes como máximo, luego de eso la academia se reserva el derecho de admisión y no podrán ingresar al aula. ' + '\n\n', 
                'La academia No está obligada a notificar en cada oportunidad las fechas de pago y se reserva el derecho de efectuar la cobranza en forma directa o a través de una entidad financiera, bancaria o de otro tipo. Para lo cual se realiza la siguiente autorización. '  + '\n\n',    

  
            ]
          ,alignment: 'justify'}
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'start'
          },
          header2: {
            fontSize: 14,
            bold: true,
            alignment: 'start'
          },
          img:{
            width: 100,
            height: 100
          },
          negrita:{
            fontSize: 14,
            bold: true,
          },
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        }
      };



      // Agregar una nueva página
      
/*       
      const segundaHoja = {
        image: this.imagenTitulo,
        width: 100,
        height: 100,
        text: [
          { text: 'Texto adicional en la segunda página\n\n', style: 'header' },
          { text: 'Más texto aquí...', alignment: 'justify' }
        ],
        pageBreak: 'before' // Esto fuerza un salto de página antes de este contenido
      };
      
      ctm.content.push(segundaHoja);
       */
      
      const segundaHoja = {
/*         stack: [
          // Imagen
          { image: this.imagenTitulo, width: 100, height: 100 },
          // Texto
          { text: 'QUINTO: Autorizo a Academias VD SPA RUT 77.026.583-5  para que en caso de simple retardo, mora o incumplimiento de las obligaciones contraídas en este documento y el pagare mis datos y los demás derivados de dichos documentos puedan ser ingresados, procesados, tratados y comunicados a terceros sin restricciones en el registro o banco de datos SICOM (Sistemas de morosidades y protestos DICOM).' + '\n\n', style: 'negrita' },
          'Esta autorización es permanente pudiendo ser revocada sin efecto retroactivo y con fecha no anterior al último documento de pago emitido a mi nombre' + '\n\n\n',
          { text: 'Academias VD SPA', style: 'negrita' },
          { text: 'IMPORTANTE ', style: '' },
          'Día: ', { text: this.horarioDia, style: Object.assign({}, 'negrita') },



          { text: 'Hora: ', style: '' },
          { text: 'Inicio de clases: ', style: '' },
        ], */

        content: [
          'First paragraph',
          'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ],


        pageBreak: 'before' // Esto fuerza un salto de página antes de este contenido
      };
      
      
      




      const sextaHoja = {
        stack: [
          // Imagen
          { image: this.imagenTitulo, width: 100, height: 100 },
          // Texto
          { text: 'QUINTO: Autorizo a Academias VD SPA RUT 77.026.583-5  para que en caso de simple retardo, mora o incumplimiento de las obligaciones contraídas en este documento y el pagare mis datos y los demás derivados de dichos documentos puedan ser ingresados, procesados, tratados y comunicados a terceros sin restricciones en el registro o banco de datos SICOM (Sistemas de morosidades y protestos DICOM).' + '\n\n', style: 'negrita' },
          'Esta autorización es permanente pudiendo ser revocada sin efecto retroactivo y con fecha no anterior al último documento de pago emitido a mi nombre',
        ],
        pageBreak: 'before' // Esto fuerza un salto de página antes de este contenido
      };



      ctm.content.push(segundaHoja);
      //ctm.content.push(terceraHoja);
      //ctm.content.push(cuartaHoja);
      //ctm.content.push(quintaHoja);
      ctm.content.push(sextaHoja);


      
      const pdfDocGenerator = pdfMake.createPdf(ctm);
      pdfDocGenerator.getBlob((blob) => {
        const body = new FormData();
        body.append('file', blob);
        this.serviceTest.sendImagenPost(body);
      });
      pdfMake.createPdf(ctm).open();
    };
  }
  








  xd(){
    const cuerpo = new FormData();
    cuerpo.append('file','adasdsa');
    console.log("11111",cuerpo);
    
  }

  openSameWindowPdf(){



    const body = new FormData();
    body.append('file',"5df6s15");
    console.log("manda",body);

    //pdfMake.createPdf(documentDefinition).open({}, window);
  }

  printPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).print();
  }


  downloadPdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).download();
  }


  openPdfStackOfParagrahps() {
    var dd:any = {
      content: [
        {text: 'Tables', style: 'header'},
        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
        {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Medio de pago', 'Fecha de pago', 'Total pagado'],
              ['Débito', '29-01-2029', '$130.000']
            ]
          }
        },
      ],
      style:{
        tableExample:{
          width:300,
          color:'red'

        }

      }
    }
    pdfMake.createPdf(dd).open();
  }



}
