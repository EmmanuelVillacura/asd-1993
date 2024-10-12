import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() message:string | null = null;
  @Input() button1:string | null = null;
  @Input() button2:string | null = null;

  constructor(public activeModal: NgbActiveModal){}

}
