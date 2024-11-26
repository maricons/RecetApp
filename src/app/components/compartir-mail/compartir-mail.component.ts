import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-compartir-mail',
  templateUrl: './compartir-mail.component.html',
  styleUrls: ['./compartir-mail.component.scss'],
})
export class CompartirMailComponent implements OnInit {

  email: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  sendEmail() {
    console.log('Correo ingresado:', this.email); // Accede al valor actualizado
  }

}
