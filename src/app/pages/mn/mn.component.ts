import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ContactanosComponent } from '../../components/contactanos/contactanos.component';

@Component({
  selector: 'app-mn',
  standalone: true,
  imports: [],
  templateUrl: './mn.component.html',
  styleUrl: './mn.component.scss'
})
export default class MnComponent {
  private modalElement!: HTMLElement;
  private modalImageElement!: HTMLImageElement;
  private closeButton!: HTMLElement;

  // Inicialización después de que la vista esté lista
  ngAfterViewInit(): void {
    this.modalElement = document.getElementById('imageModal')!;
    this.modalImageElement = document.getElementById('modalImage') as HTMLImageElement;
    this.closeButton = document.getElementById('closeModal')!;

    // Vincular eventos
    this.attachEventListeners();
  }

  // Desvincular eventos al destruir el componente
  ngOnDestroy(): void {
    this.detachEventListeners();
  }

  private attachEventListeners(): void {
    // Vincular clics a imágenes
    const images = document.querySelectorAll<HTMLImageElement>('img[data-image-index]');
    images.forEach((img) =>
      img.addEventListener('click', () => this.openModal(img.src))
    );

    // Vincular el cierre del modal
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeModal());
    }

    // Cerrar modal con teclado (Esc)
    document.addEventListener('keydown', this.handleKeydown);
  }

  private detachEventListeners(): void {
    const images = document.querySelectorAll<HTMLImageElement>('img[data-image-index]');
    images.forEach((img) =>
      img.removeEventListener('click', () => this.openModal(img.src))
    );

    if (this.closeButton) {
      this.closeButton.removeEventListener('click', () => this.closeModal());
    }

    document.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.closeModal();
  };

  public openModal(imageSrc: string): void {
    if (this.modalElement && this.modalImageElement) {
      this.modalImageElement.src = imageSrc; // Configurar imagen en el modal
      this.modalElement.style.display = 'flex'; // Mostrar modal
    }
  }

  public closeModal(): void {
    if (this.modalElement) {
      this.modalElement.style.display = 'none'; // Ocultar modal
    }
  }
}
