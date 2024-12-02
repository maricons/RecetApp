import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Firestore, collection, addDoc, doc, getDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriaService } from 'src/app/services/category.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertService } from '../../services/alert.service';  // Importa el servicio de alertas

@Component({
  selector: 'app-new-recipe-modal',
  templateUrl: './new-recipe-modal.component.html',
  styleUrls: ['./new-recipe-modal.component.scss'],
})


export class NewRecipeModalComponent implements OnInit {

  selectedImage: string | null | undefined = null;
  customOptions: any;

  recipe = {
    titulo: '',
    descripcion: '',
    ingredientes: '',
    instrucciones: '',
    minutos: '',
    imagenUrl: '',
    categoria: ''
  };

  categorias: string[] = [];

  selectedFile: File | null = null;
  currentUser: any;

  photo: string | undefined;

  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private afAuth: AngularFireAuth,
    private categoriaService: CategoriaService,
    private alertService: AlertService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('Usuario autenticado:', this.currentUser);
      }
    });
  }

  ngOnInit() {
    this.getCategories();

    this.customOptions = {
      header: 'Selecciona una Categoría',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Seleccionado Cancelar');
          }
        },
        {
          text: 'Seleccionar',
          handler: (value: string) => {
            console.log('Categoría seleccionada:', value);
          }
        }
      ]
    };
  }

  // Función para enumerar instrucciones
  procesarInstrucciones(): void {
    if (this.recipe.instrucciones) {
      let lineas = this.recipe.instrucciones.split('\n');

      let lineasNumeradas = lineas.map((linea, index) => {
        if (linea.trim() !== '') {
          return `${index + 1}. ${linea.trim()}`;
        }
        return '';
      });

      this.recipe.instrucciones = lineasNumeradas.filter(Boolean).join('\n');

    }
  }

  getCategories() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data.categorias; // Asegúrate de que esto coincida con la estructura del JSON
      console.log(this.categorias); // Aquí puedes trabajar con los datos
    }, error => {
      console.error('Error al obtener las categorías:', error);
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
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
    } catch (error) {
      console.error('Error al tomar o seleccionar foto:', error);
    }
  }

  /*onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }*/

  async uploadImage(base64Image: string): Promise<string> {
    const storage = getStorage();
    const uniqueFileName = `${this.currentUser.uid}-${Date.now()}`;
    const storageRef = ref(storage, `recipe-images/${uniqueFileName}`);

    // Subir la imagen a Firebase Storage4

    const response = await fetch(base64Image); // `base64Image` es la URL de datos
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    // Obtener la URL de descarga de la imagen subida
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  }

  async saveRecipe() {
    console.log('Save Recipe button clicked');

    if (this.photo && this.currentUser) {
      try {
        console.log('Selected file:', this.selectedFile);

        this.procesarInstrucciones();

        this.recipe.imagenUrl = await this.uploadImage(this.photo);
        console.log('Image uploaded successfully:', this.recipe.imagenUrl);

        // Obtener la información del usuario actual
        const userRef = doc(this.firestore, `users/${this.currentUser.uid}`);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        // Acceder a las propiedades usando la notación de corchetes
        const authorName = `${userData?.['firstName']} ${userData?.['lastName']}`;

        // Guardar la receta con la información del autor
        const recipesCollection = collection(this.firestore, 'recetas');
        await addDoc(recipesCollection, {
          categoria: this.recipe.categoria,
          titulo: this.recipe.titulo,
          descripcion: this.recipe.descripcion,
          ingredientes: this.recipe.ingredientes,
          instrucciones: this.recipe.instrucciones,
          minutos: Number(this.recipe.minutos),
          imagen: this.recipe.imagenUrl,
          autorId: this.currentUser.uid,  // UID del autor para futuras referencias
        });
        this.alertService.presentAlert('Recetas', 'Receta publicada con éxito.');

        this.dismiss();  // Cierra el modal después de guardar la receta
      } catch (error) {
        console.error('Error al agregar receta:', error);
      }
    } else {
      console.error('No se seleccionó ninguna imagen o no se ha autenticado el usuario');
    }
  }
}