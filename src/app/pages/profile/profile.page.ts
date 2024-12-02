import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que estás importando AuthService correctamente
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';  // Importa el servicio de alertas

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('confirmationModal') confirmationModal!: IonModal;

  firstName: string = '';
  lastName: string = '';
  profilePictureUrl: string = '';
  selectedFile: File | null = null;

  currentUser: User | null = null;

  photo: string | undefined;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: Auth,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Obtiene el usuario autenticado cuando la página se inicializa
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.loadUserProfile();  // Cargar el perfil del usuario autenticado
      }
    });
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async loadUserProfile() {
    if (this.currentUser?.uid) {
      const userRef = doc(this.firestore, `users/${this.currentUser.uid}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.firstName = userData?.['firstName'] || '';
        this.lastName = userData?.['lastName'] || '';
        this.profilePictureUrl = userData?.['profilePictureUrl'] || ''; // Cargar la URL de la imagen
      }
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Obtén la imagen como Base64 o URL de datos
        source: CameraSource.Prompt, // Permite al usuario elegir entre cámara o galería
      });

      this.photo = photo.dataUrl; // Guarda la foto en formato Base64 o URL

      this.openModal();
    } catch (error) {
    }
  }

  async confirmPhoto() {
    if (this.photo) {
      try {
        // Asegúrate de que el usuario esté autenticado
        const uid = this.currentUser?.uid;
        if (uid) {
          // Sube la foto al almacenamiento y obtiene su URL
          const downloadUrl = await this.uploadProfilePicture(this.photo, uid);

          // Actualiza la base de datos con la nueva URL
          await this.savePhotoToDatabase(uid, downloadUrl);

          // Actualiza la foto en la interfaz
          this.profilePictureUrl = downloadUrl;

          this.alertService.presentAlert('Perfil', 'Has cambiado tu foto de perfil con éxito.');
        } else {
          this.alertService.presentAlert('Perfil', 'No estás autenticado.');
        }
      } catch (error) {
        console.error('Error al confirmar y guardar la foto:', error);
      }
    }

    this.closeModal(); // Cierra el modal
  }

  cancelPhoto() {

    this.alertService.presentAlert('Perfil', 'Cancelaste el cambio de foto de perfil.');

    this.photo = undefined;
    this.closeModal();
  }

  openModal() {
    this.confirmationModal.present();
  }

  // Cerrar el modal
  closeModal() {
    this.confirmationModal.dismiss();
  }

  async saveProfile() {
    if (this.currentUser?.uid) {
      const uid = this.currentUser.uid;

      try {
        // Si hay una foto capturada
        if (this.photo) {
          // Sube la foto capturada y obtén la URL
          this.profilePictureUrl = await this.uploadProfilePicture(this.photo, uid);
        }

        // Actualiza el perfil del usuario
        await this.updateProfile(uid, this.firstName, this.lastName, this.profilePictureUrl);

        this.alertService.presentAlert('Perfil', 'Actualizaste tu perfil exitosamente.');
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    }
  }


  async uploadProfilePicture(base64Image: string, uid: string): Promise<string> {
    // Define la ruta donde se guardará la imagen
    const filePath = `profile-pictures/${uid}/profile_picture.jpg`;
    const fileRef = ref(this.storage, filePath);

    // Convierte la cadena Base64 a un objeto Blob
    const response = await fetch(base64Image); // `base64Image` es la URL de datos
    const blob = await response.blob();

    // Sube el Blob al almacenamiento
    await uploadBytes(fileRef, blob);

    // Obtén y devuelve la URL de descarga
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  }

  async savePhotoToDatabase(uid: string, photoUrl: string): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await updateDoc(userDocRef, { profilePictureUrl: photoUrl });
  }

  async updateProfile(uid: string, firstName: string, lastName: string, profilePictureUrl: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userRef, {
      firstName: firstName,
      lastName: lastName
    }, { merge: true });
  }

  logout() {
    this.authService.logout(); // Llama al servicio AuthService para cerrar sesión
  }
}
