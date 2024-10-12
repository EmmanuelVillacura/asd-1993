import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { TestasdService } from 'src/app/services/testasd.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  rutAlumno:string = '';
  matriculaAlumno:any[]=[];


  fileList1:any[]=[];


  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(private serviceImg:TestasdService){

  }
  ngOnInit(): void {
  }

  xd(file:any){
    console.log("asdasdasda", file);
    
  }





  pruebaupload(){
    const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  }
  







  envioTest(){
    const body = new FormData();
    //const binarioData = Buffer.from(this.fileList2[0].thumbUrl, 'base64');
    //const binaryData = new Uint8Array(atob(this.fileList2[0].thumbUrl).split('').map(char => char.charCodeAt(0)));

    //body.append('Imagen', binaryData);

    this.serviceImg.sendImagenPost(body).subscribe(res => {
      console.log("respuesta", res);
      
    }); 
  }



  }

