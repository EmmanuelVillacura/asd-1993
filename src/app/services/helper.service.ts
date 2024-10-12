import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../pages/loader/loader.component';
import { AlertComponent } from '../pages/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private modalService:NgbModal) { }



  formatearRut(rut: string): string {
    rut = rut.replace(/\D/g, ''); // Eliminar puntos y guión si existen
    rut = rut.replace(/^0+/, ''); // Eliminar ceros a la izquierda
    const rutFormateado = rut.slice(0, -1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + rut.slice(-1); // Aplicar formato
    return rutFormateado;
  }

  async showLoader() {
    let modalRef = this.modalService.open(LoaderComponent, {
        windowClass: 'loader-modal no-background-modal',
        backdrop: 'static', // Evita el fondo borroso
        centered: true
    });
    return modalRef;
}



async showError(msgParam:string,botonText:string){
  try {
      let modalRef = this.modalService.open(AlertComponent,{windowClass:'app-modal message-modal',centered:true});

      if(msgParam == null){
          msgParam = 'error_inesperado';
      }
      var msg = msgParam;

      modalRef.componentInstance.message = msg;
      modalRef.componentInstance.button1 = botonText;
      return await modalRef.result;
  } catch (error) {
    return null;
  }
  
}


dismissAll()
{
  this.modalService.dismissAll();
}

open(content:any,options:NgbModalOptions)
{
  return this.modalService.open(content,options);
}


}
