import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  isModalOpen = true; // El modal estará abierto inicialmente

  constructor(private router: Router) {}

  // Método para redirigir a la página tab1
  goHome() {
    this.router.navigate(['/tab1']); // Redirige a la página tab1
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false; // Cambia el estado de isModalOpen a false para cerrar el modal
  }
}
