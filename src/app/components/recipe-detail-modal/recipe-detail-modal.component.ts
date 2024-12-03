import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, collection, doc, setDoc, deleteDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { CompartirMailComponent } from '../compartir-mail/compartir-mail.component'
import { IonModal } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

declare var cordova: any;

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.scss'],
})
export class RecipeDetailModalComponent {


  @ViewChild('modal') modal: IonModal;

  @Input() receta: any;
  authorName: string = 'Cargando...'; // Variable para almacenar el nombre del autor
  isLiked: boolean = false;
  currentUser: any;
  likeCount: number = 0;

  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private afAuth: AngularFireAuth,
    private emailComposer: EmailComposer
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.checkIfLiked();  // Verificar si ya ha dado like
        this.getLikeCount();
      }
    });



  }

  async sendEmail() {

    const formattedIngredients = this.receta.ingredientes
      .split('\n') // Divide los ingredientes por líneas
      .map((ing: string) => ing.trim()) // Elimina espacios en blanco extra
      .filter((ing: string) => ing !== '') // Elimina líneas vacías
      .join('<br>'); // Une las líneas con saltos de línea en HTML

    const formattedInstructions = this.receta.instrucciones
      .split(/\d\.\s/) // Divide por números seguidos de un punto y espacio
      .filter((step: string) => step.trim() !== '') // Filtra pasos vacíos
      .map((step: string, index: number) => `${index + 1}. ${step.trim()}<br>`) // Agrega el número y salto de línea
      .join('');

    const emailBody = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="font-size: 24px; color: #555;">${this.receta.titulo}</h1>
          <p><b>Descripción:</b> ${this.receta.descripcion}</p>
          <b>Ingredientes:</b><br>
          ${formattedIngredients}
          <br><br>
          <b>Instrucciones:</b><br>
          ${formattedInstructions}
        </body>
      </html>
    `;

    const email = {
      to: this.email,
      attachments: [], // Agregar rutas de archivos si necesitas adjuntar algo
      subject: `${this.authorName} compartió una receta`,
      body: emailBody,
      isHtml: true, // Indica si el contenido es HTML
    };

    await this.emailComposer.open(email);

    // Verificar disponibilidad de la app de correo
    /*cordova.plugins.email.isAvailable((isAvailable: boolean) => {
      if (isAvailable) {
        // Si hay una app de correo disponible, abrir el editor de correos
        cordova.plugins.email.open(email, (success: boolean) => {
          if (success) {
            console.log('Correo enviado correctamente.');
          } else {
            console.log('El correo fue cancelado.');
          }
        });
      } else {
        console.error('No hay ninguna aplicación de correo instalada o habilitada.');
      }
    });*/
  }


  ngOnInit() {
    this.loadAuthorName();
  }

  async loadAuthorName() {

    console.log(this.receta.autorId);
    if (this.receta && this.receta.autorId) {

      const userRef = doc(this.firestore, `users/${this.receta.autorId}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.authorName = `${userData?.['firstName']} ${userData?.['lastName']}`;
        console.log(this.authorName);
      } else {
        this.authorName = 'Autor desconocido';
      }
    } else {
      this.authorName = 'Autor desconocido';
    }
  }


  dismiss() {
    this.modalController.dismiss();
  }

  toggleLike() {
    if (!this.currentUser) {
      console.log('El usuario no está autenticado.');
      return;
    }

    const postID = this.receta.id;
    const userID = this.currentUser.uid;
    const likeDocRef = doc(this.firestore, `likes/${postID}_${userID}`);

    this.isLiked = !this.isLiked;
    this.likeCount += this.isLiked ? 1 : -1;

    // Actualizar Firebase en segundo plano (de manera asíncrona)
    if (this.isLiked) {
      // Si se ha dado like, añadir el documento en Firebase
      setDoc(likeDocRef, {
        postID: postID,
        userID: userID
      }).then(() => {
        console.log('Like añadido en Firebase.');
      }).catch(err => {
        // Si ocurre un error, revertir los cambios
        console.log('Error al añadir like:', err);
        this.isLiked = false;
        this.likeCount--;  // Revertir el contador
      });
    } else {
      // Si se ha quitado el like, eliminar el documento en Firebase
      deleteDoc(likeDocRef).then(() => {
        console.log('Like eliminado en Firebase.');
      }).catch(err => {
        // Si ocurre un error, revertir los cambios
        console.log('Error al eliminar like:', err);
        this.isLiked = true;
        this.likeCount++;  // Revertir el contador
      });
    }
  }

  async checkIfLiked() {
    if (!this.currentUser) return;

    const postID = this.receta.id;
    const userID = this.currentUser.uid;
    const likeDocRef = doc(this.firestore, `likes/${postID}_${userID}`);

    const likeDoc = await getDoc(likeDocRef);
    this.isLiked = likeDoc.exists();  // Actualizar el estado del like
  }

  async getLikeCount() {
    const likesCollectionRef = collection(this.firestore, 'likes');
    const q = query(likesCollectionRef, where('postID', '==', this.receta.id));

    const likeDocs = await getDocs(q);
    this.likeCount = likeDocs.size;  // Establece el número total de likes
  }

  openShareModal() {
    this.modal.present(); // Abrimos el modal
  }

  email: string = '';


  enviarEmail() {
    if (this.email) {
      console.log('Correo electrónico enviado a:', this.email);

      this.modal.dismiss();

      this.sendEmail();



    } else {
      console.log('Por favor ingresa un correo válido.');
    }
  }


  /*async openShareModal() {

    console.log('El icono de compartir fue clickeado.');

    const modal = await this.modalController.create({
      component: CompartirMailComponent,
      cssClass: 'custom-modal',
    });
    await modal.present();
  }*/
}